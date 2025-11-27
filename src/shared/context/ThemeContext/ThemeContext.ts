import { createContext, Dispatch, SetStateAction } from "react";

import ThemeEnum from "@shared/enums/theme";

export interface IThemeContext {
  theme: ThemeEnum;
  setTheme: Dispatch<SetStateAction<ThemeEnum>>;
}

const ThemeContext = createContext<IThemeContext>({
  theme: ThemeEnum.SYSTEM,
  setTheme: () => {},
});

export default ThemeContext;
