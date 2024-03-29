import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { getMarkers, initialize, resetMarker } from "./leaflet-tooltip-layout";
import Leaflet, { Marker, PathOptions } from "leaflet";
import { GatewayType } from "arpanet-map";

const tooltipClassName = "override-leaflet-tooltip-style";

/**
 * This is the check used in leaflet itself. Unfortunately, we have to use any here because the type definitions for leaflet types don't contain the information we need to check if the target is a marker.
 *
 * TODO find a way to do this without using the non-public _radius member
 */
function isMarker(target: any): target is Marker {
  return target.getLatLng && (!target._radius || target._radius <= 10);
}

const defaultIcon = Leaflet.icon({
  //
  // Note: I did not have success using Webpack's base64 data-url image loader here, so for now I will load the image separately. It could be an issue with Leaflet, but I'd need to look into this further to pinpoint the issue.
  //
  iconUrl: "circle-grey.png",
  iconSize: [10, 10],
});

type MapContentsProps = {
  url: string;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  setFocusedGateway: (focusedGateway: GatewayType) => void;
};

export default function MapContents({
  url,
  setIsSidebarOpen,
  setFocusedGateway,
}: MapContentsProps): null {
  const map = useMap();

  const [geoJsonLayer, setGeoJsonLayer] = useState<Leaflet.GeoJSON | null>(
    null
  );
  const [data, setData] = useState(null);

  const loadData = (key: string): void => {
    // clear all the existing markers from leaflet-tooltip-layout to avoid getting an error
    getMarkers().length = 0;
    // load the geoJSON data
    fetch(`api/v1/map/${key}`)
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
      style: (feature) => {
        const s: PathOptions = {};

        if (feature?.properties?.filename === "USA.geojson") {
          s.color = "#00aa00";
          // background map should not be clickable
          s.interactive = false;
        }

        return s;
      },
      pointToLayer: (geoJsonPoint, latlng) =>
        Leaflet.marker(latlng, { icon: defaultIcon }),
      onEachFeature: function (feature, layer) {
        // only consider point features, skip polylines, etc
        if (feature?.geometry?.type !== "Point") {
          // layer.classList += 'test';
          // el.style.pointerEvents = 'none';
          // layer.style({ cursor: 'crosshair' });
          return;
        }

        const name = feature.properties.name;
        const marker = layer;
        const tooltip = marker.bindTooltip(name, { permanent: true });
        tooltip.addTo(map);
        tooltip.on("click", function () {
          setIsSidebarOpen(true);
          setFocusedGateway(feature.properties);
        });
        if (isMarker(marker)) resetMarker(marker);
        // The `leaflet-tooltip-layout` library overwrites the className option on tooltips, so this next line is a workaround. Note that the `addTo` call following `bindTooltip` above is a pre-requisite for this line to work.
        marker.getTooltip()?.getElement()?.classList.add(tooltipClassName);
      },
    }).addTo(map);

    setGeoJsonLayer(_geoJsonLayer);
  }, [data, map, setFocusedGateway, setIsSidebarOpen]);

  useEffect(() => {
    initialize(map);
  }, [geoJsonLayer, map]);

  return null;
}
