declare module "arpanet-map" {
  export type GatewayType = {
    gatewayId: number;
    name: string;
    longName: string;
    address?: string;
    wikidataId?: string;
  };

  export type PersonType = {
    personId: number;
    fullName: string;
    nickname: string;
    wikidataId: string;
  };

  export type ManifestMapType = {
    versionId: number;
    fileName: string;
    partialDateString: string;
  };
}
