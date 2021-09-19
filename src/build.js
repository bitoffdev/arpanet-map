/*

Notes:
- "Point coordinates are in x, y order (easting, northing for projected
   coordinates, longitude, and latitude for geographic coordinates)"
   https://tools.ietf.org/html/rfc7946#appendix-A.1
 */

const fs = require("fs");
var parseArgs = require("minimist");

var model = require("./model");

/*
 * the url of the GeoJSON file containing the United States
 */
const BG_URL = "src/background.geo.json";

const buildGeoJson = async (mapVersion, output_dir) => {
  const mapVersionId = mapVersion.dataValues.id;

  // make a copy of geoJson to alter
  const bgContent = fs.readFileSync(BG_URL);
  const geoJson = JSON.parse(bgContent);

  const gateways = await model.Gateway.findAll({});

  const usedGateways = [];

  const edges = await model.InternetEdge.findAll({
    attributes: ["head_id", "tail_id"],
    where: {
      version_id: mapVersionId,
    },
  });

  for (let edge of edges) {
    const headGatewayId = edge.dataValues.head_id;
    const tailGatewayId = edge.dataValues.tail_id;

    const headGateway = gateways.find(
      (gateway) => gateway.dataValues.id === headGatewayId
    );
    const tailGateway = gateways.find(
      (gateway) => gateway.dataValues.id === tailGatewayId
    );

    if (
      !usedGateways.some((gateway) => gateway.dataValues.id === headGatewayId)
    )
      usedGateways.push(headGateway);
    if (
      !usedGateways.some((gateway) => gateway.dataValues.id === tailGatewayId)
    )
      usedGateways.push(tailGateway);

    geoJson.features.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [headGateway.dataValues.longitude, headGateway.dataValues.latitude],
          [tailGateway.dataValues.longitude, tailGateway.dataValues.latitude],
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
        name: gateway.dataValues.short_name,
        longName: gateway.dataValues.long_name,
        address: gateway.dataValues.address,
        wikidataId: gateway.dataValues.wikidata_id,
      },
      geometry: {
        type: "Point",
        coordinates: [
          gateway.dataValues.longitude,
          gateway.dataValues.latitude,
        ],
      },
    });
  }

  const partialDateString = mapVersion.dataValues.date
    .toISOString()
    .substring(0, 7);
  const fileName = `${partialDateString}.geo.json`;
  fs.writeFileSync(`${output_dir}/${fileName}`, JSON.stringify(geoJson));

  return {
    fileName,
    partialDateString,
  };
};

const build = async (output_dir) => {
  const mapVersions = await model.Version.findAll({
    attributes: ["id", "date"],
  });

  if (!fs.existsSync(output_dir)) {
    fs.mkdirSync(output_dir);
  }

  // write geo json files
  Promise.all(
    mapVersions.map((mapVersion) => buildGeoJson(mapVersion, output_dir))
  ).then((snapshots) => {
    // write a manifest json file
    fs.writeFileSync(
      `${output_dir}/mapsManifest.json`,
      JSON.stringify({ snapshots })
    );
  });
};

const main = () => {
  const argv = parseArgs(process.argv.slice(2));

  if (argv.h || argv.help) {
    console.log(`
Build GeoJSON Maps

This script pulls data out of the database (MySQL) and generates GeoJSON files.

Usage:
    node ./src/build.js [-h] [--help] [--dest BUILD_DIR]
`);

    return;
  }

  const output_dir = argv.dest || "public";
  console.log(`Using Output Directory: ${output_dir}`);

  model.sequelize.sync().then(() => build(output_dir));
};

main();
