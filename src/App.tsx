import Tabs, { TabPane } from "rc-tabs";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MapContainer } from "react-leaflet";
import Sidebar from "react-sidebar";
import styled, { createGlobalStyle } from "styled-components";

import "fontsource-overpass";

// we need to import these vendored css files so that everything renders as expected
import "leaflet/dist/leaflet.css";
import "rc-tabs/assets/index.css";

import GatewayDetail from "./GatewayDetail";
import Network from "./MapContents";
import { GatewayType, ManifestMapType } from "arpanet-map";
import GitHubRibbon from "./GitHubRibbon";

import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";

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

function App() {
  const [focusedGateway, setFocusedGateway] = useState<GatewayType | null>(
    null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [manifest, setManifest] = useState<{
    snapshots: Array<ManifestMapType>;
  } | null>(null);

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

  const nextActiveMap = (steps: number) =>
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
    <Sidebar
      sidebar={focusedGateway && <GatewayDetail gateway={focusedGateway} />}
      open={isSidebarOpen}
      onSetOpen={setIsSidebarOpen}
      styles={{ sidebar: { background: "white" } }}
      pullRight={true}
    >
      <GitHubRibbon />
      <StyledContainer>
        <GlobalStyle />
        <MapContainer
          style={{ flex: 1 }}
          center={[39.74739, -105]}
          zoom={4}
          scrollWheelZoom={true}
        >
          {activeKey && (
            <Network
              url={activeKey}
              setIsSidebarOpen={setIsSidebarOpen}
              setFocusedGateway={setFocusedGateway}
            />
          )}
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
              <TabPane
                tab={snapshot.partialDateString}
                key={snapshot.fileName}
              />
            ))}
        </StyledTabs>
      </StyledContainer>
    </Sidebar>
  );
}

const instance = createInstance({
  urlBase: "https://bitoffdev.matomo.cloud/",
  siteId: 2,
});

const MatomaApp = () => (
  <MatomoProvider value={instance}>
    <App />
  </MatomoProvider>
);

export default MatomaApp;
