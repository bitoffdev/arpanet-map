const fs = require('fs');
const util = require('util');

var model = require('./model');

/*
 * the url of the GeoJSON file containing the United States
 */
const BG_URL = 'original.geo.json';

const bgContent = fs.readFileSync(BG_URL);
const geoJson = JSON.parse(bgContent);

const buildGeoJson = async mapVersion => {
    const mapVersionId = mapVersion.dataValues.id;

    const gateways = await model.Gateway.findAll({
    });

    // add gateway pins to GeoJSON
    for (gateway of gateways) {
        geoJson.features.push({
            type: "Feature",
            properties: {
                name: gateway.dataValues.short_name,
            },
          geometry: {
            type: "Point",
            coordinates: [
                gateway.dataValues.latitude,
                gateway.dataValues.longitude,
            ],
          },
        });
    }

    const edges = await model.InternetEdge.findAll({
        attributes: ['head_id', 'tail_id'],
        where: {
            version_id: mapVersionId,
        },
    });
    // const raw_edges = result.map(edge => edge.dataValues);

    for (edge of edges) {
        const headGatewayId = edge.dataValues.head_id;
        const tailGatewayId = edge.dataValues.tail_id;

        const headGateway = gateways.find(gateway => gateway.dataValues.id === headGatewayId);
        const tailGateway = gateways.find(gateway => gateway.dataValues.id === tailGatewayId);

        geoJson.features.push({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [headGateway.dataValues.latitude, headGateway.dataValues.longitude],
                    [tailGateway.dataValues.latitude, tailGateway.dataValues.longitude],
                ],
            },
            properties: {},
        });
    }

    const partialDateString = mapVersion.dataValues.date.toISOString().substring(0,7);
    fs.writeFileSync(partialDateString + '.geo.json', JSON.stringify(geoJson));
};

const build = async () => {
    const mapVersions = await model.Version.findAll({
        attributes: ['id', 'date'],
    });
    mapVersions.map(buildGeoJson);
}

model.sequelize.sync().then(build);