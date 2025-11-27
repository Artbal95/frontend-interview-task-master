import ThemeEnum from "@shared/enums/theme";

import { ISelectOptions } from "@appTypes/select.types";

const THEME_OPTIONS: ISelectOptions<ThemeEnum>[] = [
  { label: "Dark", value: ThemeEnum.DARK },
  { label: "Light", value: ThemeEnum.LIGHT },
];

export default THEME_OPTIONS;
