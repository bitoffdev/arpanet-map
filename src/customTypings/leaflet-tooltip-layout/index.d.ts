declare module "leaflet-tooltip-layout" {
  import { Marker } from "leaflet";

  export interface InitializeFunction {
    (map: Map): void;
  }

  export interface ResetMarkerFunction {
    (marker: Marker): void;
  }

  export interface GetMarkersFunction {
    (): Array<Marker>;
  }

  export interface RemoveAllPolylineFunction {
    (): void;
  }

  export const initialize: InitializeFunction;
  export const resetMarker: ResetMarkerFunction;
  export const getMarkers: GetMarkersFunction;
  export const removeAllPolyline: RemoveAllPolylineFunction;
}
