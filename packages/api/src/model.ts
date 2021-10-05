import { Sequelize, Model, DataTypes, Optional } from "sequelize";

const CONNECTION_URL = "mysql://root:password@localhost:3306/arpanet";

export const sequelize = new Sequelize(CONNECTION_URL, {
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

interface GatewayVariantAttributes {
  id: number;
  short_name: string;
  long_name: string;
  description: string;
}

interface GatewayVariantCreationAttributes
  extends Optional<GatewayVariantAttributes, "id"> {}

export interface GatewayVariantInstance
  extends Model<GatewayVariantAttributes, GatewayVariantCreationAttributes>,
    GatewayVariantAttributes {}

/**
 * The GatewayVariant identifies what particular piece of hardware was used as the gateway for a network. For example, the gateway might be an IMP or TIP.
 */
export const GatewayVariant = sequelize.define<GatewayVariantInstance>(
  "gateway_variant",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    short_name: DataTypes.STRING,
    long_name: DataTypes.STRING,
    description: DataTypes.STRING,
  }
);

interface GatewayAttributes {
  id: number;
  short_name: string;
  long_name: string;
  variant_id: number;
  latitude: number;
  longitude: number;
  address: string;
  wikidata_id: string;
}

interface GatewayCreationAttributes extends Optional<GatewayAttributes, "id"> {}

export interface GatewayInstance
  extends Model<GatewayAttributes, GatewayCreationAttributes>,
    GatewayAttributes {}

export const Gateway = sequelize.define<GatewayInstance>("gateway", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  short_name: DataTypes.STRING,
  long_name: DataTypes.STRING,
  variant_id: {
    type: DataTypes.INTEGER,
    references: {
      model: GatewayVariant,
      key: "id",
    },
  },
  latitude: {
    type: DataTypes.FLOAT,
    // @ts-ignore
    min: -90,
    max: +90,
  },
  longitude: {
    type: DataTypes.FLOAT,
    // @ts-ignore
    min: -180,
    max: +180,
  },
  address: DataTypes.STRING,
  wikidata_id: DataTypes.STRING,
});

interface VersionAttributes {
  id: number;
  date: Date;
}

interface VersionCreationAttributes extends Optional<VersionAttributes, "id"> {}

export interface VersionInstance
  extends Model<VersionAttributes, VersionCreationAttributes>,
    VersionAttributes {}

export const Version = sequelize.define<VersionInstance>("version", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  date: DataTypes.DATE,
});

interface InternetEdgeAttributes {
  id: number;
  head_id: number;
  tail_id: number;
  version_id: number;
}

interface InternetEdgeCreationAttributes
  extends Optional<InternetEdgeAttributes, "id"> {}

export interface InternetEdgeInstance
  extends Model<InternetEdgeAttributes, InternetEdgeCreationAttributes>,
    InternetEdgeAttributes {}

export const InternetEdge = sequelize.define<InternetEdgeInstance>(
  "internet_edge",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    head_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Gateway,
        key: "id",
      },
    },
    tail_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Gateway,
        key: "id",
      },
    },
    version_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Version,
        key: "id",
      },
    },
  }
);

interface ComputerModelAttributes {
  id: number;
  name: string;
}

interface ComputerModelCreationAttributes
  extends Optional<ComputerModelAttributes, "id"> {}

export interface ComputerModelInstance
  extends Model<ComputerModelAttributes, ComputerModelCreationAttributes>,
    ComputerModelAttributes {}

export const ComputerModel = sequelize.define<ComputerModelInstance>(
  "computer_model",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: DataTypes.STRING,
  }
);

interface PersonAttributes {
  id: number;
  full_name: string;
  nickname: string;
  wikidata_id: string;
}

interface PersonCreationAttributes extends Optional<PersonAttributes, "id"> {}

export interface PersonInstance
  extends Model<PersonAttributes, PersonCreationAttributes>,
    PersonAttributes {}

export const Person = sequelize.define<PersonInstance>("person", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  full_name: DataTypes.STRING,
  nickname: DataTypes.STRING,
  wikidata_id: DataTypes.STRING,
});

interface StatusReportAttributes {
  id: number;
  address: number;
  gateway: number;
  computer_model: number;
  status_or_prediction: string;
  obtained_from: number;
  rfc: number;
}

interface StatusReportCreationAttributes
  extends Optional<StatusReportAttributes, "id"> {}

export interface StatusReportInstance
  extends Model<StatusReportAttributes, StatusReportCreationAttributes>,
    StatusReportAttributes {}

export const StatusReport = sequelize.define<StatusReportInstance>(
  "status_report",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    address: DataTypes.INTEGER,
    gateway: {
      type: DataTypes.INTEGER,
      references: {
        model: Gateway,
        key: "id",
      },
    },
    computer_model: {
      type: DataTypes.INTEGER,
      references: {
        model: ComputerModel,
        key: "id",
      },
    },
    status_or_prediction: DataTypes.STRING,
    obtained_from: {
      type: DataTypes.INTEGER,
      references: {
        model: Person,
        key: "id",
      },
    },
    rfc: DataTypes.INTEGER,
  }
);
