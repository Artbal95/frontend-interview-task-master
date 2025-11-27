import { FC } from "react";
import { RouterProvider } from "react-router";

import "@core/styles/main.css";

import ROUTES from "./routes";
import ThemeProvider from "../shared/providers/ThemeProvider";

const App: FC = () => (
  <ThemeProvider>
    <RouterProvider router={ROUTES} />
  </ThemeProvider>
);

export default App;
