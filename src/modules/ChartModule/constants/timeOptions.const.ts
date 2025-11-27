import { TimeType } from "@modules/ChartModule/types/data.types";

import { ISelectOptions } from "@appTypes/select.types";

const TIME_OPTIONS: ISelectOptions<TimeType>[] = [
  { label: "Week", value: "week" },
  { label: "Day", value: "day" },
];

export default TIME_OPTIONS;
