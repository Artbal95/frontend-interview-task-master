import { useEffect, useState } from "react";

import ThemeEnum from "@shared/enums/theme";
import ThemeContext from "@shared/context/ThemeContext";

const ThemeProvider: FCC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeEnum>(() => {
    const saved = localStorage.getItem("theme") as ThemeEnum | null;
    if (saved) return saved;
    const systemIsDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return systemIsDark ? ThemeEnum.DARK : ThemeEnum.LIGHT;
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
