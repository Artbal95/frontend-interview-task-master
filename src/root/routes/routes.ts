import { createBrowserRouter } from "react-router";

import HomePage from "@pages/HomePage";
import ChartPage from "@pages/ChartPage";

import RoutesEnum from "@shared/enums/routes";

const ROUTES = createBrowserRouter([
  {
    path: RoutesEnum.HOME,
    Component: HomePage,
  },
  {
    path: RoutesEnum.CHART,
    Component: ChartPage,
  },
]);

export default ROUTES;
