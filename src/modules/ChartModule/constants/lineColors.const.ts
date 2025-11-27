import { LinesType } from "@modules/ChartModule/types/data.types";

const LINE_COLORS: Record<Exclude<LinesType, "all">, string> = {
  "0": "#5E5D67",
  "10001": "#3838E7",
  "10002": "#FF8346",
  "10003": "#FFC107",
};

export default LINE_COLORS;
