import fs from "fs";

import { Person, PersonInstance } from "../model";

export const build = async (output_dir: string) => {
  const people: Array<PersonInstance> = await Person.findAll({});

  const d = `${output_dir}/api/v1`;

  await fs.promises.mkdir(d, { recursive: true });

  fs.writeFileSync(`${d}/people.json`, JSON.stringify({ people }));
};
