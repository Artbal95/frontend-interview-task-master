import { Group } from "@visx/group";
import { AxisBottom, AxisLeft, AxisScale } from "@visx/axis";
import { timeFormat } from "d3-time-format";
import { FC } from "react";

import { MARGIN } from "@widgets/ChartWidget/constants/chart.const";

import useTheme from "@shared/hooks/useTheme";
import ThemeEnum from "@shared/enums/theme";

interface IAxesProps {
  innerH: number;
  xScale: AxisScale;
  yScale: AxisScale;
}

const Axes: FC<IAxesProps> = ({ xScale, yScale, innerH }) => {
  const { theme } = useTheme();

  const axisColor = theme === ThemeEnum.LIGHT ? "var(--color-primary)" : "#ddd";
  const formatDate = timeFormat("%b %d");

  return (
    <>
      <Group left={MARGIN.left} top={MARGIN.top}>
        <AxisLeft
          scale={yScale}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={{ fill: axisColor, fontSize: 12 }}
        />
      </Group>

      <Group left={MARGIN.left} top={MARGIN.top}>
        <AxisBottom
          top={innerH}
          scale={xScale}
          stroke={axisColor}
          tickStroke={axisColor}
          tickFormat={formatDate}
          tickLabelProps={{ fill: axisColor, fontSize: 12 }}
        />
      </Group>
    </>
  );
};

export default Axes;
