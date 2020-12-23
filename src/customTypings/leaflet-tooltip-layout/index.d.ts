declare module "leaflet-tooltip-layout" {

  export interface InitializeFunction {
    (map: Map): void;
  }

  export const initialize: InitializeFunction;

  export interface ResetMarkerFunction {
    (marker: any): void;
  }

  export const resetMarker: ResetMarkerFunction;

  export const getMarkers: any;
  export const removeAllPolyline: any;
}
