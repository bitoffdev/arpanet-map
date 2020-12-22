// import {
//   initialize,
//   resetMarker,
//   getMarkers,
//   removeAllPolyline,
// } from "leaflet-tooltip-layout";

// import leafletTooltipLayout from "leaflet-tooltip-layout";
// import { Map } from '@types/leaflet';

declare module 'leaflet-tooltip-layout' {
  // const noTypesYet: any;
  // export default noTypeYet;

  // export function initialize(m: any, two: any): void;

  export interface InitializeFunction {
    (map: Map): void
  }

  export const initialize: InitializeFunction;

  export interface ResetMarkerFunction {
    (marker: Marker): void
  }

  export const resetMarker: ResetMarkerFunction;

  // export interface getMarkers

  export const getMarkers: any;
  export const removeAllPolyline: any;
}
