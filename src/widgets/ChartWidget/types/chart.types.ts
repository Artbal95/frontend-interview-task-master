import { ParentSizeProvidedProps } from "@visx/responsive/lib/components/ParentSize";
import { ScaleConfig, ScaleConfigToD3Scale } from "@visx/scale";

export interface IResponsiveProps
  extends Pick<ParentSizeProvidedProps, "width" | "height"> {
  innerW: number;
  innerH: number;
}

export interface IChartRequiredProps<D extends object> {
  data: D[];
  xAccessor: (d: D) => Date;
  yAccessor: (d: D) => number;
  idAccessor: (d: D) => string;
}

export interface IChartFilteredProps {
  activeLine?: string[];
  chartType?: ChartType;
}

export interface IRenderTooltipProps<D extends object> {
  data: D[];
}

export type ChartContainerProps<D extends object> = IResponsiveProps &
  IChartRequiredProps<D> &
  IChartFilteredProps;

export type UseFilterDataProps<D extends object> = IResponsiveProps &
  IChartRequiredProps<D> &
  Pick<IChartFilteredProps, "activeLine">;

export interface IFilterDataReturn<D extends object> {
  filtered: D[];
  grouped: Record<string, D[]>;
  xScaleOriginal: ScaleConfigToD3Scale<ScaleConfig>;
  yScale: ScaleConfigToD3Scale<ScaleConfig>;
}
