/*

Notes:
- "Point coordinates are in x, y order (easting, northing for projected
   coordinates, longitude, and latitude for geographic coordinates)"
   https://tools.ietf.org/html/rfc7946#appendix-A.1

*/

import { ManifestMapType } from "arpanet-map";
import fs from "fs";

import {
  Gateway,
  GatewayInstance,
  InternetEdge,
  InternetEdgeInstance,
  Version,
  VersionInstance,
} from "../model";

/*
 * the url of the GeoJSON file containing the United States
 */
const BG_URL = "src/background.geo.json";

/**
 * Construct and return GeoJson for the given map version
 */
const buildGeoJson = async (mapVersion: VersionInstance): Promise<any> => {
  const mapVersionId: number = mapVersion.getDataValue("id");

  // make a copy of geoJson to alter
  const bgContent = fs.readFileSync(BG_URL).toString();
  const geoJson = JSON.parse(bgContent);

  const gateways: Array<GatewayInstance> = await Gateway.findAll({});

  const usedGateways: Array<GatewayInstance> = [];

  const edges: Array<InternetEdgeInstance> = await InternetEdge.findAll({
    attributes: ["head_id", "tail_id"],
    where: {
      version_id: mapVersionId,
    },
  });

  for (let edge of edges) {
    const headGatewayId = edge.getDataValue("head_id");
    const tailGatewayId = edge.getDataValue("tail_id");

    const headGateway = gateways.find(
      (gateway) => gateway.getDataValue("id") === headGatewayId
    );
    const tailGateway = gateways.find(
      (gateway) => gateway.getDataValue("id") === tailGatewayId
    );

    // Type narrowing. If this happens in practice, it means that the database is inconsistent :(
    if (headGateway === undefined || tailGateway === undefined) continue;

    if (
      !usedGateways.some(
        (gateway) => gateway.getDataValue("id") === headGatewayId
      )
    )
      usedGateways.push(headGateway);
    if (
      !usedGateways.some(
        (gateway) => gateway.getDataValue("id") === tailGatewayId
      )
    )
      usedGateways.push(tailGateway);

    geoJson.features.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [
            headGateway.getDataValue("longitude"),
            headGateway.getDataValue("latitude"),
          ],
          [
            tailGateway.getDataValue("longitude"),
            tailGateway.getDataValue("latitude"),
          ],
        ],
      },
      properties: {},
    });
  }

  // add gateway pins to GeoJSON
  for (let gateway of usedGateways) {
    geoJson.features.push({
      type: "Feature",
      properties: {
        gatewayId: gateway.getDataValue("id"),
        name: gateway.getDataValue("short_name"),
        longName: gateway.getDataValue("long_name"),
        address: gateway.getDataValue("address"),
        wikidataId: gateway.getDataValue("wikidata_id"),
      },
      geometry: {
        type: "Point",
        coordinates: [
          gateway.getDataValue("longitude"),
          gateway.getDataValue("latitude"),
        ],
      },
    });
  }

  return geoJson;
};

/**
 * Construct and save GeoJson for the given map version
 */
const writeGeoJson = async (
  mapVersion: VersionInstance,
  output_dir: string
): Promise<ManifestMapType> => {
  const mapVersionId: number = mapVersion.getDataValue("id");

  const geoJson = await buildGeoJson(mapVersion);

  const partialDateString = mapVersion
    .getDataValue("date")
    .toISOString()
    .substring(0, 7);
  const fileName = `${partialDateString}.geo.json`;
  fs.writeFileSync(`${output_dir}/${fileName}`, JSON.stringify(geoJson));

  return {
    versionId: mapVersionId,
    fileName,
    partialDateString,
  };
};

export const build = async (output_dir: string) => {
  const mapVersions: Array<VersionInstance> = await Version.findAll({
    attributes: ["id", "date"],
  });

  const d = `${output_dir}/api/v1/map`;

  await fs.promises.mkdir(d, { recursive: true });

  // write geo json files
  await Promise.all(
    mapVersions.map((mapVersion) => writeGeoJson(mapVersion, d))
  ).then((snapshots: Array<ManifestMapType>) => {
    // write a manifest json file
    fs.writeFileSync(`${d}/mapsManifest.json`, JSON.stringify({ snapshots }));
  });
};
