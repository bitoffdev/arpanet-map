import fs from "fs";

import { StatusReport, StatusReportInstance } from "../model";

export const build = async (output_dir: string) => {
  const statusReports: Array<StatusReportInstance> = await StatusReport.findAll(
    {}
  );

  const d = `${output_dir}/api/v1`;

  await fs.promises.mkdir(d, { recursive: true });

  fs.writeFileSync(
    `${d}/statusReports.json`,
    JSON.stringify({ statusReports })
  );
};
