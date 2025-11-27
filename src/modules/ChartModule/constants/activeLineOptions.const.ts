import { LinesType } from "@modules/ChartModule/types/data.types";

import { ISelectOptions } from "@appTypes/select.types";

const ACTIVE_LINE_OPTIONS: ISelectOptions<LinesType>[] = [
  { label: "All", value: "all" },
  { label: "Original", value: "0" },
  { label: "Variation A", value: "10001" },
  { label: "Variation B", value: "10002" },
  { label: "Variation C", value: "10003" },
];

export default ACTIVE_LINE_OPTIONS;
