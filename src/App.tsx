import Leaflet from "leaflet";
import {
  initialize,
  resetMarker,
  getMarkers,
} from "leaflet-tooltip-layout";
import { MapContainer, useMap } from "react-leaflet";
import Tabs, { TabPane } from "rc-tabs";
import { useEffect, useState } from "react";

import "fontsource-overpass";

// we need to import these vendored css files so that everything renders as expected
import "leaflet/dist/leaflet.css";
import "rc-tabs/assets/index.css";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import styled, { createGlobalStyle } from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  padding: 0;
`;

const StyledButton = styled.button`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  justify-content: center;

  & > * {
    flex: 1;
    font-size: 2em;
  }
`;

const StyledTabs = styled(Tabs)`
  .rc-tabs-tab {
    font-family: "Overpass";
    font-size: 2em;
    color: #444;
    padding: 10px;
  }

  // hide the "extra" dropdown
  .rc-tabs-nav-more {
    display: none;
  }

  // restyle the indicators for more overflowing tabs using a gradient rather than a harsh, red border
  .rc-tabs-nav-wrap-ping-left::before {
    border: 0;
    width: 30px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }

  // restyle the indicators for more overflowing tabs using a gradient rather than a harsh, red border
  .rc-tabs-nav-wrap-ping-right::after {
    border: 0;
    width: 30px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  }
`;

const tooltipClassName = "override-leaflet-tooltip-style";

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  div.${tooltipClassName} {
    font-family: "Overpass";
    font-size: 1.5em;

    // remove the default direction carrot / arrow
    &::before {
      display: none !important;
    }
  }
`;

const defaultIcon = Leaflet.icon({
  //
  // Note: I did not have success using Webpack's base64 data-url image loader here, so for now I will load the image separately. It could be an issue with Leaflet, but I'd need to look into this further to pinpoint the issue.
  //
  iconUrl: "circle-grey.png",
  iconSize: [10, 10],
});

function Network({ url }: { url: string }): null {
  const map = useMap();

  const [geoJsonLayer, setGeoJsonLayer] = useState<any | null>(null);
  const [data, setData] = useState(null);

  const loadData = (key: string): void => {
    // clear all the existing markers from leaflet-tooltip-layout to avoid getting an error
    getMarkers().length = 0;
    // load the geoJSON data
    fetch(key)
      .then((result) => result.json())
      .then((json) => setData(json));
  };

  useEffect(() => loadData(url), [url]);

  useEffect(() => {
    // clear the previous map
    map.eachLayer((layer) => {
      layer.remove();
    });

    const _geoJsonLayer = Leaflet.geoJSON(data ?? undefined, {
      style: feature => {
        if (feature?.properties?.filename === "USA.geojson") {
          return {
            color: "#00aa00"
          };
        }
        return {};
      },
      pointToLayer: (geoJsonPoint, latlng) =>
        Leaflet.marker(latlng, { icon: defaultIcon }),
      onEachFeature: function (feature, layer) {
        // only consider point features, skip polylines, etc
        if (feature?.geometry?.type !== "Point") return;

        const name = feature.properties.name;
        const marker = layer;
        marker.bindTooltip(name, { permanent: true }).addTo(map);
        resetMarker(marker);
        // The `leaflet-tooltip-layout` library overwrites the className option on tooltips, so this next line is a workaround. Note that the `addTo` call following `bindTooltip` above is a pre-requisite for this line to work.
        marker.getTooltip()?.getElement()?.classList.add(tooltipClassName);
      },
    }).addTo(map);

    setGeoJsonLayer(_geoJsonLayer);
  }, [data, map]);

  useEffect(() => {
    initialize(map);
  }, [geoJsonLayer, map]);

  return null;
}

type ManifestMapType = { fileName: string, partialDateString: string };

function App() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [manifest, setManifest] = useState<{ snapshots: Array<ManifestMapType> } | null>(null);

  const loadManifest = () =>
    fetch("mapsManifest.json")
      .then((result) => result.json())
      .then((manifestJson) => {
        setManifest(manifestJson);
        // automatically load the first Arpanet snapshot
        setActiveKey(manifestJson.snapshots[0].fileName);
      });

  useEffect(() => {
    if (manifest != null) return;

    loadManifest();
  }, [manifest]);

  const nextActiveMap = (steps: number)  =>
    setActiveKey((activeKey) => {
      if (manifest?.snapshots == null || manifest.snapshots.length <= 1)
        return activeKey;
      const currentIndex = manifest.snapshots.findIndex(
        (map: ManifestMapType) => map.fileName === activeKey
      );
      const newIndex = Math.max(
        0,
        Math.min(manifest.snapshots.length - 1, currentIndex + steps)
      );
      const newActiveMap = manifest.snapshots[newIndex].fileName;
      return newActiveMap;
    });

  return (
    <StyledContainer>
      <GlobalStyle />
      <MapContainer
        style={{ flex: 1 }}
        center={[39.74739, -105]}
        zoom={4}
        scrollWheelZoom={true}
      >
        {activeKey &&
        <Network url={activeKey} />
        }
      </MapContainer>
      <StyledTabs
        activeKey={activeKey ?? undefined}
        onChange={setActiveKey}
        tabBarStyle={{ flex: 1 }}
        tabBarExtraContent={{
          left: (
            <StyledButton onClick={() => nextActiveMap(-1)}>
              <FaAngleLeft />
            </StyledButton>
          ),
          right: (
            <StyledButton onClick={() => nextActiveMap(1)}>
              <FaAngleRight />
            </StyledButton>
          ),
        }}
      >
        {manifest &&
          manifest.snapshots.map((snapshot) => (
            <TabPane tab={snapshot.partialDateString} key={snapshot.fileName} />
          ))}
      </StyledTabs>
    </StyledContainer>
  );
}

export default App;
