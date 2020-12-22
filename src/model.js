var Sequelize = require("sequelize");

var CONNECTION_URL = "mysql://root:password@localhost:3306/arpanet";

var sequelize = new Sequelize(CONNECTION_URL, {
  define: {
    // disable the default createdAt and updatedAt columns
    timestamps: false,

    // don't use camelcase for automatically added attributes but
    // underscore style so updatedAt will be updated_at
    underscored: true,

    // disable the modification of table names; By default,
    // sequelize will automatically transform all passed model
    // names (first parameter of define) into plural.  if you don't
    // want that, set the following
    freezeTableName: true,
  },
});

/**
 * The GatewayVariant identifies what particular piece of hardware was used as the gateway for a network. For example, the gateway might be an IMP or TIP.
 */
var GatewayVariant = sequelize.define("gateway_variant", {
  short_name: Sequelize.STRING,
  long_name: Sequelize.STRING,
  description: Sequelize.STRING,
});

var Gateway = sequelize.define("gateway", {
  short_name: Sequelize.STRING,
  long_name: Sequelize.STRING,
  variant_id: {
    type: Sequelize.INTEGER,
    references: {
      model: GatewayVariant,
      key: "id",
    },
  },
  latitude: {
    type: Sequelize.FLOAT,
    min: -90,
    max: +90,
  },
  longitude: {
    type: Sequelize.FLOAT,
    min: -180,
    max: +180,
  },
});

var Version = sequelize.define("version", {
  date: Sequelize.DATE,
});

var InternetEdge = sequelize.define("internet_edge", {
  head_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Gateway,
      key: "id",
    },
  },
  tail_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Gateway,
      key: "id",
    },
  },
  version_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Version,
      key: "id",
    },
  },
});

sequelize.sync().then(function () {
  console.log("done");
});

exports.sequelize = sequelize;
exports.InternetEdge = InternetEdge;
exports.Version = Version;
exports.Gateway = Gateway;
