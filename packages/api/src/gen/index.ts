import parseArgs from "minimist";

import * as computerModel from "./computerModel";
import * as gateway from "./gateway";
import * as map from "./map";
import * as person from "./person";
import * as statusReport from "./statusReport";

import { ComputerModel, sequelize } from "../model";
import { mapFinderOptions } from "sequelize/types/lib/utils";

const main = () => {
  const argv = parseArgs(process.argv.slice(2));

  if (argv.h || argv.help) {
    console.log(`
     Build GeoJSON Maps
     
     This script pulls data out of the database (MySQL) and generates GeoJSON files.
     
     Usage:
         node ./bin/buildMaps.js [-h] [--help] [--dest BUILD_DIR]
     `);

    return;
  }

  const output_dir = argv.dest || "public";
  console.log(`Using Output Directory: ${output_dir}`);

  sequelize
    .sync()
    .then(async () => computerModel.build(output_dir))
    .then(async () => map.build(output_dir))
    .then(async () => gateway.build(output_dir))
    .then(async () => person.build(output_dir))
    .then(async () => statusReport.build(output_dir))
    .then(() => console.log("Done."))
    .then(() => console.log(`Output written to directory ${output_dir}`))
    .then(() => process.exit(0));
};

// ie. if __name__ == "__main__"
if (typeof require !== "undefined" && require.main === module) {
  main();
}
