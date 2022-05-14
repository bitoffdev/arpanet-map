import { LineString, MultiLineString } from "geojson";
import L from "leaflet";

// global variables
var map: L.Map;
var markerList: Array<SpecialMarker> = []; // all markers here
var polylineList: Array<L.Polyline> = []; // all polylines here

type PolylineCreatedCallback =
  | ((ply: L.Polyline<LineString | MultiLineString, any>) => void)
  | null;

// events
var _onPolylineCreated: PolylineCreatedCallback = null; // will be called after polyline has been created

interface SpecialMarker extends L.Marker {
  __ply: L.Polyline<LineString | MultiLineString, any>;
  disp: L.Point;
  _icon: any;
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
  polylineList = [];

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

  setRandomPos();
  layoutByForce();
  setEdgePosition();
  drawLine(map);

  // event registrations
  map.on("zoomstart", function () {
    removeAllPolyline(map);
  });

  map.on("zoomend", function () {
    setRandomPos();
    layoutByForce();
    setEdgePosition();
    drawLine(map);
  });

  map.on("dragend", function () {
    removeAllPolyline(map);
    setRandomPos();
    layoutByForce();
    setEdgePosition();
    drawLine(map);
  });

  map.on("resize", function () {
    removeAllPolyline(map);
    setRandomPos();
    layoutByForce();
    setEdgePosition();
    drawLine(map);
  });
}

export function resetMarker(marker: L.Marker) {
  const tooltip = marker.getTooltip();
  if (tooltip === undefined) return;

  const name = tooltip.getContent();
  if (name === undefined) return;
  const options = tooltip.options;
  marker.unbindTooltip();

  marker.bindTooltip(name, {
    pane: options.pane,
    offset: options.offset,
    className: "heading",
    permanent: true,
    interactive: true,
    direction: "left",
    // sticky: 'none',
    opacity: options.opacity,
  });
  markerList.push(marker as SpecialMarker);
}

export function getMarkers() {
  return markerList;
}

function removeAllPolyline(map: L.Map) {
  var i;
  for (i = 0; i < polylineList.length; i++) {
    map.removeLayer(polylineList[i]);
  }
  polylineList = [];
}

/**
 * Draw lines between markers and tooltips
 * @param map leaflet map
 */
function drawLine(map: L.Map) {
  removeAllPolyline(map);
  for (var i = 0; i < markerList.length; i++) {
    const marker: SpecialMarker = markerList[i] as SpecialMarker;
    var markerDom = marker._icon;
    var markerPosition = getPosition(markerDom);
    var label = marker.getTooltip() as SpecialTooltip;

    var labelDom = label._container;
    var labelPosition = getPosition(labelDom);

    var x1 = labelPosition.x;
    var y1 = labelPosition.y;

    var x = markerPosition.x;
    var y = markerPosition.y;

    x1 -= 5;
    y1 += 2;
    if (x1 - x !== 0 || y1 - y !== 0) {
      if (x1 + labelDom.offsetWidth < markerPosition.x) {
        x1 += labelDom.offsetWidth;
      }
      if (y1 + labelDom.offsetHeight < markerPosition.y) {
        y1 += labelDom.offsetHeight;
      }
      var lineDest = L.point(x1, y1);
      var destLatLng = map.layerPointToLatLng(lineDest);

      setTimeout(
        ((marker, destLatLng) => () => {
          let ply = L.polyline([marker.getLatLng(), destLatLng]);
          _onPolylineCreated && _onPolylineCreated(ply);
          marker.__ply = ply;
          polylineList.push(ply);
          ply.addTo(map);
        })(marker, destLatLng),
        0
      );
    }
  }
}

function setRandomPos() {
  for (var i = 0; i < markerList.length; i++) {
    var marker = markerList[i];
    var label = marker.getTooltip() as SpecialTooltip;
    var labelDom = label._container;
    var markerDom = marker._icon;
    var markerPosition = getPosition(markerDom);
    // var angle = Math.floor(Math.random() * 19 + 1) * 2 * Math.PI / 20;
    var angle = ((2 * Math.PI) / 6) * i;
    var x = markerPosition.x;
    var y = markerPosition.y;
    var dest = L.point(
      Math.ceil(x + 50 * Math.sin(angle)),
      Math.ceil(y + 50 * Math.cos(angle))
    );
    L.DomUtil.setPosition(labelDom, dest);
  }
}

const scaleTo = (a: L.Point, b: L.Point): L.Point =>
  L.point(a.x * b.x, a.y * b.y);

function normalize(a: L.Point) {
  var l = a.distanceTo(L.point(0, 0));
  if (l === 0) {
    return a;
  }
  return L.point(a.x / l, a.y / l);
}

function fa(x: number, k: number) {
  return (x * x) / k;
}

function fr(x: number, k: number) {
  return (k * k) / x;
}

/**
 * get position form el.style.transform
 */
function getPosition(el: HTMLElement) {
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
  var area = (window.innerWidth * window.innerHeight) / 10;
  var k = Math.sqrt(area / markerList.length);
  var dpos = L.point(0, 0);
  var v_pos;
  var v;
  var i;

  for (i = 0; i < markerList.length; i++) {
    v = markerList[i];
    // get position of label v
    v.disp = L.point(0, 0);
    v_pos = getPosition((v.getTooltip()! as SpecialTooltip)._container);

    // compute gravitational force
    for (var j = 0; j < markerList.length; j++) {
      var u = markerList[j];
      if (i !== j) {
        var u_pos = getPosition((u.getTooltip()! as SpecialTooltip)._container);
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

    var disp = markerList[i].disp;
    var p = getPosition(leafletTooltip._container);
    var d = scaleTo(
      normalize(disp),
      L.point(Math.min(Math.abs(disp.x), t), Math.min(Math.abs(disp.y), t))
    );
    p = p.add(d);
    p = L.point(Math.ceil(p.x), Math.ceil(p.y));
    L.DomUtil.setTransform(leafletTooltip._container, p);
  }
}

function layoutByForce() {
  var start = Math.ceil(window.innerWidth / 10);
  var times = 10; // 50;
  var t;
  for (var i = 0; i < times; i += 1) {
    t = start * (1 - i / (times - 1));
    computePositionStep(t);
  }

  for (i = 0; i < markerList.length; i++) {
    const leafletTooltip = markerList[i].getTooltip() as SpecialTooltip;
    if (leafletTooltip === undefined) continue;

    // var disp = markerList[i].disp;
    let p = getPosition(leafletTooltip._container);
    const { offsetWidth: width, offsetHeight: height } =
      leafletTooltip._container;
    p = L.point(Math.ceil(p.x - width / 2), Math.ceil(p.y - height / 2));
    L.DomUtil.setTransform(leafletTooltip._container, p);
  }
}

function setEdgePosition() {
  var bounds = map.getBounds();
  var northWest = map.latLngToLayerPoint(bounds.getNorthWest());
  var southEast = map.latLngToLayerPoint(bounds.getSouthEast());

  for (let i = 0; i < markerList.length; i++) {
    const leafletTooltip = markerList[i].getTooltip() as SpecialTooltip;
    if (leafletTooltip === undefined) continue;

    var tooltip = getPosition(leafletTooltip._container);
    var marker = getPosition(markerList[i]._icon);
    const { offsetWidth: width, offsetHeight: height } =
      leafletTooltip._container;

    var isEdge = false;
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
