import { MouseEvent, ReactNode } from "react";
import { AreaClosed, LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { curveMonotoneX } from "@visx/curve";
import { AccessorForArrayItem, PositionScale } from "@visx/shape/lib/types";

import { MARGIN } from "@widgets/ChartWidget/constants/chart.const";
import {
  IChartFilteredProps,
  IFilterDataReturn,
  IResponsiveProps,
} from "@widgets/ChartWidget/types/chart.types";

interface ILinesProps<D extends object, ID = string>
  extends Pick<IChartFilteredProps, "chartType">,
    Pick<IResponsiveProps, "innerW" | "innerH"> {
  isTooltipOpen: boolean;
  tooltipLeft?: number;
  grouped: Record<string, D[]>;
  yScale: IFilterDataReturn<D>["yScale"];
  getColor: (id: ID) => string;
  onX: AccessorForArrayItem<D, number>;
  onY: AccessorForArrayItem<D, number>;
  onMouseMove: (e: MouseEvent<SVGRectElement>) => void;
  onMouseLeave: () => void;
}

const Lines = <D extends object, ID = string>({
  isTooltipOpen,
  tooltipLeft,
  grouped,
  chartType,
  innerW,
  innerH,
  yScale,
  getColor,
  onX,
  onY,
  onMouseMove,
  onMouseLeave,
}: ILinesProps<D, ID>): ReactNode => (
  <Group left={MARGIN.left} top={MARGIN.top} clipPath="url(#clip)">
    {Object.entries(grouped).map(([id, arr]) => {
      const color = getColor(id as ID);

      return (
        <g key={id}>
          {chartType === "area" && (
            <AreaClosed
              data={arr}
              x={onX}
              y={onY}
              yScale={yScale as unknown as PositionScale}
              curve={curveMonotoneX}
              stroke={color}
              fill={`${color}33`}
              strokeWidth={2}
            />
          )}

          {chartType === "smooth" && (
            <LinePath
              data={arr}
              x={onX}
              y={onY}
              stroke={color}
              strokeWidth={2}
              curve={curveMonotoneX}
            />
          )}

          {chartType === "line" && (
            <LinePath
              data={arr}
              x={onX}
              y={onY}
              stroke={color}
              strokeWidth={2}
            />
          )}
        </g>
      );
    })}

    {/* Hover area */}
    <rect
      width={innerW}
      height={innerH}
      fill="transparent"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />

    {/* Vertical line */}
    {isTooltipOpen && (
      <line
        x1={tooltipLeft}
        x2={tooltipLeft}
        y1={0}
        y2={innerH}
        stroke="#aaa"
        strokeDasharray="4"
      />
    )}
  </Group>
);

export default Lines;
