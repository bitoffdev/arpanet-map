import fs from "fs";

import { ComputerModel, ComputerModelInstance } from "../model";

export const build = async (output_dir: string) => {
  const entities: Array<ComputerModelInstance> = await ComputerModel.findAll(
    {}
  );

  const d = `${output_dir}/api/v1`;

  await fs.promises.mkdir(d, { recursive: true });

  fs.writeFileSync(`${d}/computerModels.json`, JSON.stringify({ entities }));
};
