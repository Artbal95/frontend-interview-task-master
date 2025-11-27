import { FC } from "react";
import { ParentSize } from "@visx/responsive";

import { MARGIN } from "@widgets/ChartWidget/constants/chart.const";
import { IResponsiveProps } from "@widgets/ChartWidget/types/chart.types";

interface IChartLayoutProps {
  children: FC<IResponsiveProps>;
}

const ChartResponsiveLayout: FC<IChartLayoutProps> = ({
  children: Children,
}) => (
  <ParentSize>
    {({ width, height }) => {
      const innerW = width - MARGIN.left - MARGIN.right;
      const innerH = height - MARGIN.top - MARGIN.bottom;

      return (
        <Children
          width={width}
          height={height}
          innerW={innerW < 0 ? 0 : innerW}
          innerH={innerH < 0 ? 0 : innerH}
        />
      );
    }}
  </ParentSize>
);

export default ChartResponsiveLayout;
