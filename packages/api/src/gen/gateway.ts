import fs from "fs";

import { Gateway, GatewayInstance } from "../model";

export const build = async (output_dir: string) => {
  const entities: Array<GatewayInstance> = await Gateway.findAll({});

  const d = `${output_dir}/api/v1`;

  await fs.promises.mkdir(d, { recursive: true });

  fs.writeFileSync(`${d}/gateways.json`, JSON.stringify({ entities }));
};
