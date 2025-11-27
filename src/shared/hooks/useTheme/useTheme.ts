import { useContext } from "react";

import ThemeContext, { IThemeContext } from "@shared/context/ThemeContext";

const useTheme = (): IThemeContext => useContext(ThemeContext);

export default useTheme;
