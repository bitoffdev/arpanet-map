import { LineString, MultiLineString } from "geojson";
import L from "leaflet";

// global variables
let map: L.Map;
const markerList: Array<SpecialMarker> = []; // all markers here
const polylineList: Array<L.Polyline> = []; // all polylines here

let guard = false;

type PolylineCreatedCallback =
  | ((ply: L.Polyline<LineString | MultiLineString, any>) => void)
  | null;

// events
let _onPolylineCreated: PolylineCreatedCallback = null; // will be called after polyline has been created

interface SpecialMarker extends L.Marker {
  __ply: L.Polyline<LineString | MultiLineString, any>;
  disp: L.Point;
  // _icon is a private member exposed by Leaflet that we need to access
  _icon: HTMLElement;
}

interface SpecialTooltip extends L.Tooltip {
  // _container is a private member exposed by Leaflet that we need to access
  _container: HTMLElement;
}

export function initialize(
  leafletMap: L.Map,
  onPolylineCreated?: PolylineCreatedCallback
) {
  map = leafletMap;
  polylineList.length = 0;

  //default style
  if (onPolylineCreated) {
    _onPolylineCreated = onPolylineCreated;
  } else {
    _onPolylineCreated = (ply: L.Polyline) => {
      ply.setStyle({
        color: "#90A4AE",
      });
    };
  }

  layoutByForce(true);

  // event registrations
  map.on("zoomstart", () => removeAllPolyline(map));
  map.on("zoomend", () => layoutByForce(false, 20));
  map.on("dragend", () => layoutByForce(false, 10));
  map.on("resize", () => layoutByForce(true, 50));
}

/**
 * Add leaflet marker to the list of markers tracked by this tooltip layout
 * module
 */
export function resetMarker(marker: L.Marker) {
  const tooltip = marker.getTooltip();
  if (tooltip === undefined)
    throw Error("Expected argument marker to not be undefined");

  const name = tooltip.getContent();
  if (name === undefined) throw Error("Expected tooltip to have content");
  const options = tooltip.options;
  marker.unbindTooltip();

  marker.bindTooltip(name, {
    pane: options.pane,
    offset: options.offset,
    className: "heading",
    permanent: true,
    interactive: true,
    direction: "left",
    sticky: false,
    opacity: options.opacity,
  });
  markerList.push(marker as SpecialMarker);
}

export const getMarkers = () => markerList;

/**
 * Clear all the lines connecting leaflet marker with the tooltips that we
 * are positioning
 *
 * @param map leaflet map
 */
function removeAllPolyline(map: L.Map) {
  while (polylineList.length > 0) {
    const layer = polylineList.pop();
    if (layer !== undefined) map.removeLayer(layer);
  }
}

/**
 * Draw lines between markers and tooltips
 * @param map leaflet map
 */
function drawLine(map: L.Map) {
  removeAllPolyline(map);
  for (let i = 0; i < markerList.length; i++) {
    const marker: SpecialMarker = markerList[i] as SpecialMarker;
    const { x: markerX, y: markerY } = getPosition(marker._icon);
    const label = marker.getTooltip() as SpecialTooltip;
    const labelDom = label._container;
    let { x: labelX, y: labelY } = getPosition(labelDom);

    if (labelX - markerX !== 0 || labelY - markerY !== 0) {
      const lineDest = L.point(labelX, labelY);
      const destLatLng = map.layerPointToLatLng(lineDest);

      const ply = L.polyline([marker.getLatLng(), destLatLng]);
      _onPolylineCreated && _onPolylineCreated(ply);
      marker.__ply = ply;
      polylineList.push(ply);
      ply.addTo(map);
    }
  }
}

function setRandomPos() {
  for (let i = 0; i < markerList.length; i++) {
    const marker = markerList[i];
    const label = marker.getTooltip() as SpecialTooltip;
    const labelDom = label._container;
    const { x, y } = getPosition(marker._icon);
    // var angle = Math.floor(Math.random() * 19 + 1) * 2 * Math.PI / 20;
    const angle = ((2 * Math.PI) / 6) * i;
    const dest = L.point(
      Math.ceil(x + 50 * Math.sin(angle)),
      Math.ceil(y + 50 * Math.cos(angle))
    );
    L.DomUtil.setPosition(labelDom, dest);
  }
}

const scaleTo = (a: L.Point, b: L.Point): L.Point =>
  L.point(a.x * b.x, a.y * b.y);

function normalize(a: L.Point) {
  const l = a.distanceTo(L.point(0, 0));
  if (l === 0) {
    return a;
  }
  return L.point(a.x / l, a.y / l);
}

const fa = (x: number, k: number): number => (x * x) / k;

const fr = (x: number, k: number): number => (k * k) / x;

/**
 * get position form el.style.transform
 */
function getPosition(el: HTMLElement): L.Point {
  const translateString = el.style.transform
    .split("(")[1]
    .split(")")[0]
    .split(",");
  return L.point(parseInt(translateString[0]), parseInt(translateString[1]));
}

/**
 * t is the temperature in the system
 */
function computePositionStep(t: number) {
  const area = (window.innerWidth * window.innerHeight) / 10;
  // increase k to spread labels out
  const k = 1.5 * Math.sqrt(area / markerList.length);
  let dpos = L.point(0, 0);
  let v_pos: L.Point;
  let v: SpecialMarker;
  let i: number;

  for (i = 0; i < markerList.length; i++) {
    v = markerList[i];
    // get position of label v
    v.disp = L.point(0, 0);
    v_pos = getPosition((v.getTooltip()! as SpecialTooltip)._container);

    // compute gravitational force
    for (let j = 0; j < markerList.length; j++) {
      const u = markerList[j];
      if (i !== j) {
        const u_pos = getPosition(
          (u.getTooltip()! as SpecialTooltip)._container
        );
        dpos = v_pos.subtract(u_pos);
        // if (true dpos !== 0) {
        v.disp = v.disp.add(
          normalize(dpos).multiplyBy(fr(dpos.distanceTo(L.point(0, 0)), k))
        );
        // }
      }
    }
  }

  // compute force between marker and tooltip
  for (i = 0; i < markerList.length; i++) {
    v = markerList[i];
    v_pos = getPosition((v.getTooltip()! as SpecialTooltip)._container);
    dpos = v_pos.subtract(getPosition(v._icon));
    v.disp = v.disp.subtract(
      normalize(dpos).multiplyBy(fa(dpos.distanceTo(L.point(0, 0)), k))
    );
  }

  // calculate layout
  for (i = 0; i < markerList.length; i++) {
    const leafletTooltip = markerList[i].getTooltip() as SpecialTooltip;
    if (leafletTooltip === undefined) continue;

    const disp = markerList[i].disp;
    let p = getPosition(leafletTooltip._container);
    const d = scaleTo(
      normalize(disp),
      L.point(Math.min(Math.abs(disp.x), t), Math.min(Math.abs(disp.y), t))
    );
    p = p.add(d);
    p = L.point(Math.ceil(p.x), Math.ceil(p.y));
    L.DomUtil.setTransform(leafletTooltip._container, p);
  }
}

async function layoutByForce(randomize: boolean = false, times: number = 50) {
  // weak implementation of locking -- we may occasionally run into a race
  // condition where this breaks, but this shouldn't be a huge deal for now
  if (guard) return;
  guard = true;
  console.log("layoutByForce");

  if (randomize) setRandomPos();

  const start = Math.ceil(window.innerWidth / 10);
  let temperature: number;
  for (let i = 0; i < times; i += 1) {
    temperature = start * (1 - i / (times - 1));
    computePositionStep(temperature);

    for (let marker of markerList) {
      const leafletTooltip = marker.getTooltip() as SpecialTooltip;
      if (leafletTooltip === undefined) continue;

      let p = getPosition(leafletTooltip._container);
      L.DomUtil.setTransform(leafletTooltip._container, p);
    }

    drawLine(map);

    await new Promise((r) => setTimeout(r, 1));
  }

  setEdgePosition();
  drawLine(map);

  await new Promise((r) => setTimeout(r, 1));

  guard = false;
}

/**
 * constrain tooltip labels to the bounds of the Leaflet map
 *
 * Labels that are outside of the bounds will be shifted so that they are
 * inside the bounds.
 */
function setEdgePosition() {
  const bounds = map.getBounds();
  const northWest = map.latLngToLayerPoint(bounds.getNorthWest());
  const southEast = map.latLngToLayerPoint(bounds.getSouthEast());

  for (let i = 0; i < markerList.length; i++) {
    const leafletTooltip = markerList[i].getTooltip() as SpecialTooltip;
    if (leafletTooltip === undefined) continue;

    const tooltip = getPosition(leafletTooltip._container);
    const marker = getPosition(markerList[i]._icon);
    const { offsetWidth: width, offsetHeight: height } =
      leafletTooltip._container;

    let isEdge = false;
    if (marker.x > northWest.x && tooltip.x < northWest.x) {
      tooltip.x = northWest.x;
      isEdge = true;
    } else if (marker.x < southEast.x && tooltip.x > southEast.x - width) {
      tooltip.x = southEast.x - width;
      isEdge = true;
    }

    if (marker.y > northWest.y && tooltip.y < northWest.y) {
      tooltip.y = northWest.y;
      isEdge = true;
    } else if (marker.y < southEast.y && tooltip.y > southEast.y - height) {
      tooltip.y = southEast.y - height;
      isEdge = true;
    }

    if (!isEdge) {
      if (marker.x < northWest.x && tooltip.x > northWest.x - width) {
        tooltip.x = northWest.x - width;
      } else if (marker.x > southEast.x && tooltip.x < southEast.x) {
        tooltip.x = southEast.x;
      }

      if (marker.y < northWest.y && tooltip.y > northWest.y - height) {
        tooltip.y = northWest.y - height;
      } else if (marker.y > southEast.y && tooltip.y < southEast.y) {
        tooltip.y = southEast.y;
      }
    }

    L.DomUtil.setTransform(leafletTooltip._container, tooltip);
  }
}
