import { FC, ReactNode } from "react";

import ChartResponsiveLayout from "@widgets/ChartWidget/layouts/ChartResponsiveLayout";
import {
  IChartFilteredProps,
  IChartRequiredProps,
  IRenderTooltipProps,
} from "@widgets/ChartWidget/types/chart.types";
import ChartContainer from "@widgets/ChartWidget/containers/ChartContainer/ChartContainer";

interface IChartWidgetProps<D extends object, ID = string>
  extends IChartRequiredProps<D>,
    IChartFilteredProps {
  renderTooltip?: FC<IRenderTooltipProps<D>>;
  getColor: (id: ID) => string;
  hasExport?: boolean;
}

const ChartWidget = <D extends object, ID = string>(
  props: IChartWidgetProps<D, ID>,
): ReactNode => (
  <ChartResponsiveLayout>
    {(rest) => <ChartContainer<D, ID> {...props} {...rest} />}
  </ChartResponsiveLayout>
);

export default ChartWidget;
