import host_geo_1982 from "../tables/host_geo_1982.json"
import map_connection_acronym_to_host_geo_1982 from "../tables/map_connection_acronym_to_host_geo_1982.json"
import map_connection_acronym_to_manual_address from "../tables/map_connection_acronym_to_manual_address.json"
import manual_addresses from "../tables/manual_addresses.json"
import gateway_table from "../tables/gateway.json"

/**
 * record from one of our address tables:
 * - host_geo_1982
 * - manual_addresses
 */
type AddressRecord = {
        index: number;
        acronym: string;
        title1: string;
        title2: string;
        title3: string;
        street: string;
        unit: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
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

export type Address = {
    title1: string | undefined;
    title2: string | undefined;
    title3: string | undefined;
    street: string | undefined;
    city: string | undefined;
    state: string | undefined;
    postal_code: string | undefined;
    country: string | undefined;

    latitude: number | undefined;
    longitude: number | undefined;

    reference: Reference;
}

export type Gateway = {
    addresses: Array<Address>;
};

const gatewayAcronymFromId = (gatewayId: number): string | null => {
    for (let gw of gateway_table.data) {
        if (gw.id == gatewayId) {
            return gw.short_name;
        }
    }
    return null;
};

const directory1982AddressRecordFromGatewayAcronym = (gatewayAcronym: string): AddressRecord | null => {
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
}

const manualAddressRecordFromGatewayAcronym = (gatewayAcronym: string): AddressRecord | null => {
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
}

const addressRecordToAddress = (addressRecord: AddressRecord, reference: Reference): Address => ({
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

    const directory1982AddressRecord = directory1982AddressRecordFromGatewayAcronym(acronym);
    if (directory1982AddressRecord != null) {
        addresses.push(addressRecordToAddress(directory1982AddressRecord, HOST_1982_REFERENCE));
    }

    const manualAddressRecord = manualAddressRecordFromGatewayAcronym(acronym);
    if (manualAddressRecord != null) {
        addresses.push(addressRecordToAddress(manualAddressRecord, MANUAL_REFERENCE));
    }

    return {
        addresses,
    };
};