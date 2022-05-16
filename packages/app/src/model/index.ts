import map_connection_acronym_to_host_geo_1982 from "../tables/map_connection_acronym_to_host_geo_1982.json";
import map_connection_acronym_to_manual_address from "../tables/map_connection_acronym_to_manual_address.json";
import map_connection_acronum_to_rfc518 from "../tables/map_connection_acronym_to_rfc518.json";
import host_geo_1982 from "../tables/host_geo_1982.json";
import manual_addresses from "../tables/manual_addresses.json";
import rfc518_addresses from "../tables/rfc518_addresses.json";
import gateway_table from "../tables/gateway.json";
import gateway_metadata from "../tables/gateway_metadata.json";

/**
 * record from one of our address tables:
 * - host_geo_1982
 * - manual_addresses
 */
type AddressRecord = {
  // index: number;
  acronym: string;
  title1: string | null;
  title2: string | null;
  title3: string | null;
  street: string | null;
  // unit: string;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
};

type GatewayMetadataRecord = {
  acronym: string;
  long_name: string;
  description: string | null;
};

export type Reference = {
  name: string;
  url: string;
};

const HOST_1982_REFERENCE: Reference = {
  name: "1982 ARPANET Directory",
  url: "https://www.computerhistory.org/collections/catalog/102683804",
};

const MANUAL_REFERENCE: Reference = {
  name: "Manual Entry",
  url: "#",
};

const RFC518_REFERENCE: Reference = {
  name: "RFC 518",
  url: "https://www.rfc-editor.org/rfc/rfc518.txt",
};

export type Address = {
  title1: string | undefined | null;
  title2: string | undefined | null;
  title3: string | undefined | null;
  street: string | undefined | null;
  city: string | undefined | null;
  state: string | undefined | null;
  postal_code: string | undefined | null;
  country: string | undefined | null;

  latitude: number | undefined;
  longitude: number | undefined;

  reference: Reference;
};

export type Gateway = {
  addresses: Array<Address>;
  long_name: string;
  description: string | null;
};

const gatewayAcronymFromId = (gatewayId: number): string | null => {
  for (let gw of gateway_table.data) {
    if (gw.id === gatewayId) {
      return gw.short_name;
    }
  }
  return null;
};

const gatewayMetadataFromAcronym = (
  gatewayAcronym: string
): GatewayMetadataRecord | null => {
  for (let row of gateway_metadata.data) {
    if (row.acronym === gatewayAcronym) {
      return row;
    }
  }

  return null;
};

const directory1982AddressRecordFromGatewayAcronym = (
  gatewayAcronym: string
): AddressRecord | null => {
  let host_geo_1982_index = null;
  for (let mapping of map_connection_acronym_to_host_geo_1982.data) {
    if (mapping.find === gatewayAcronym) {
      host_geo_1982_index = mapping.replace;
    }
  }

  if (host_geo_1982_index != null) {
    for (let address_record of host_geo_1982.data) {
      if (address_record.acronym === host_geo_1982_index) {
        return address_record;
      }
    }
  }

  return null;
};

const manualAddressRecordFromGatewayAcronym = (
  gatewayAcronym: string
): AddressRecord | null => {
  let manual_address_index = null;
  for (let mapping of map_connection_acronym_to_manual_address.data) {
    if (mapping.find === gatewayAcronym) {
      manual_address_index = mapping.replace;
    }
  }

  if (manual_address_index != null) {
    for (let address_record of manual_addresses.data) {
      if (address_record.acronym === manual_address_index) {
        return address_record;
      }
    }
  }

  return null;
};

const rfc518AddressRecordFromGatewayAcronym = (
  gatewayAcronym: string
): AddressRecord | null => {
  let index = null;
  for (let mapping of map_connection_acronum_to_rfc518.data) {
    if (mapping.find === gatewayAcronym) {
      index = mapping.replace;
    }
  }

  if (index != null) {
    for (let address_record of rfc518_addresses.data) {
      if (address_record.acronym === index) {
        return address_record;
      }
    }
  }

  return null;
};

const addressRecordToAddress = (
  addressRecord: AddressRecord,
  reference: Reference
): Address => ({
  title1: addressRecord.title1,
  title2: addressRecord.title2,
  title3: addressRecord.title3,
  street: addressRecord.street,
  city: addressRecord.city,
  state: addressRecord.state,
  postal_code: addressRecord.postal_code,
  country: addressRecord.country,

  latitude: undefined,
  longitude: undefined,

  reference,
});

export const gatewayFromId = (gatewayId: number): Gateway => {
  const addresses = [];
  const acronym = gatewayAcronymFromId(gatewayId);

  if (acronym == null) {
    throw Error("Could not find gateway");
  }

  const metadata = gatewayMetadataFromAcronym(acronym);
  if (metadata == null) {
    throw Error("Could not find metadata for gateway");
  }

  const directory1982AddressRecord =
    directory1982AddressRecordFromGatewayAcronym(acronym);
  if (directory1982AddressRecord != null) {
    addresses.push(
      addressRecordToAddress(directory1982AddressRecord, HOST_1982_REFERENCE)
    );
  }

  const manualAddressRecord = manualAddressRecordFromGatewayAcronym(acronym);
  if (manualAddressRecord != null) {
    addresses.push(
      addressRecordToAddress(manualAddressRecord, MANUAL_REFERENCE)
    );
  }

  const rfc518AddressRecord = rfc518AddressRecordFromGatewayAcronym(acronym);
  if (rfc518AddressRecord != null) {
    addresses.push(
      addressRecordToAddress(rfc518AddressRecord, RFC518_REFERENCE)
    );
  }

  return {
    addresses,
    long_name: metadata.long_name,
    description: metadata.description,
  };
};
