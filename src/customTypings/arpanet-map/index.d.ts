declare module "arpanet-map" {
  export type GatewayType = {
    name: string;
    longName: string;
    address?: string;
    wikidataId?: string;
  };

  export type ManifestMapType = { fileName: string; partialDateString: string };
}
