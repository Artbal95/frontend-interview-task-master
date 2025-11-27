import { ISelectOptions } from "@appTypes/select.types";

const CHART_TYPE_OPTIONS: ISelectOptions<ChartType>[] = [
  { label: "Line", value: "line" },
  { label: "Area", value: "area" },
  { label: "Smooth", value: "smooth" },
];

export default CHART_TYPE_OPTIONS;
