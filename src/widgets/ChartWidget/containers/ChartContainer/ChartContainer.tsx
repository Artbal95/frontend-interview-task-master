import { FC, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { select } from "d3-selection";
import { D3ZoomEvent, zoom, ZoomScale, ZoomTransform } from "d3-zoom";
import { localPoint } from "@visx/event";
import { ScaleConfig, ScaleConfigToD3Scale } from "@visx/scale";
import { AxisScale } from "@visx/axis";
import { clsx } from "clsx";

import ExportIcon from "@assets/icons/export.svg?react";

import {
  ChartContainerProps,
  IRenderTooltipProps,
} from "@widgets/ChartWidget/types/chart.types";
import ChartLayout from "@widgets/ChartWidget/layouts/ChartLayout";
import useFilterData from "@widgets/ChartWidget/hooks/useFilterData";
import Lines from "@widgets/ChartWidget/components/Lines";
import { MARGIN } from "@widgets/ChartWidget/constants/chart.const";
import Axes from "@widgets/ChartWidget/components/Axises";

import useTheme from "@shared/hooks/useTheme";
import ThemeEnum from "@shared/enums/theme";

import styles from "./ChartContainer.module.css";

interface IChartContainerProps<D extends object, ID = string>
  extends ChartContainerProps<D> {
  renderTooltip?: FC<IRenderTooltipProps<D>>;
  getColor: (id: ID) => string;
  hasExport?: boolean;
}

const ChartContainer = <D extends object, ID = string>({
  innerW,
  innerH,
  xAccessor,
  yAccessor,
  chartType,
  renderTooltip,
  getColor,
  hasExport,
  ...props
}: IChartContainerProps<D, ID>): ReactNode => {
  const { theme } = useTheme();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const {
    tooltipOpen,
    tooltipTop,
    tooltipLeft,
    tooltipData,
    showTooltip,
    hideTooltip,
  } = useTooltip<D[]>({
    tooltipOpen: true,
    tooltipTop: 0,
    tooltipLeft: 600,
    tooltipData: [],
  });

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });
  const { filtered, grouped, yScale, xScaleOriginal } = useFilterData({
    innerW,
    innerH,
    xAccessor,
    yAccessor,
    ...props,
  });

  const [transform, setTransform] = useState<ZoomTransform | null>(null);

  const xScale = transform
    ? transform.rescaleX(xScaleOriginal as unknown as ZoomScale)
    : xScaleOriginal;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);

    const behavior = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 20])
      .translateExtent([
        [0, 0],
        [innerW, innerH],
      ])
      .extent([
        [0, 0],
        [innerW, innerH],
      ])
      .on("zoom", (event: D3ZoomEvent<SVGSVGElement, D>) => {
        setTransform(event.transform);
      });

    svg.call(behavior);

    return (): void => {
      svg.on(".zoom", null);
    };
  }, [svgRef, innerW, innerH]);

  const handleMouseMove = (e: MouseEvent<SVGRectElement>): void => {
    if (!svgRef.current) return;

    const p0 = localPoint(svgRef.current, e);
    if (!p0) return;

    const mouseX = p0.x - MARGIN.left;

    let closest: D | null = null;
    let minDx = Infinity;

    filtered.forEach((d) => {
      const px = (xScale as ScaleConfigToD3Scale<ScaleConfig>)(
        xAccessor(d),
      )! as number;
      const dx = Math.abs(px - mouseX);
      if (dx < minDx) {
        minDx = dx;
        closest = d;
      }
    });

    if (!closest) return;

    const cx = (xScale as ScaleConfigToD3Scale<ScaleConfig>)(
      xAccessor(closest),
    )! as number;

    const allPoints = filtered.filter((d) => {
      const px = (xScale as ScaleConfigToD3Scale<ScaleConfig>)(
        xAccessor(d),
      )! as number;
      return Math.abs(px - cx) < 0.5;
    });

    showTooltip({
      tooltipLeft: cx,
      tooltipTop: 0,
      tooltipData: allPoints,
    });
  };

  const handleExport = (): void => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = (): void => {
      const { width, height } = props;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = theme === ThemeEnum.DARK ? "#0E0E0E" : "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0);

      URL.revokeObjectURL(url);

      const link = document.createElement("a");
      link.download = "chart.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = url;
  };

  const isTooltipOpen =
    tooltipOpen && !!tooltipData && Array.isArray(tooltipData);
  const onX = (d: D): number =>
    (xScale as ScaleConfigToD3Scale<ScaleConfig>)(xAccessor(d)) as number;
  const onY = (d: D): number => yScale(yAccessor(d)) as number;

  return (
    <div
      className={clsx(styles.ChartContainer, { [styles.HasExport]: hasExport })}
    >
      {hasExport && (
        <div className={styles.ChartContainerExport} onClick={handleExport}>
          <ExportIcon width={40} height={40} />
        </div>
      )}
      <ChartLayout
        ref={svgRef}
        containerRef={containerRef}
        width={props.width}
        height={props.height}
        innerW={innerW}
        innerH={innerH}
      >
        <Lines<D, ID>
          innerW={innerW}
          innerH={innerH}
          grouped={grouped}
          tooltipLeft={tooltipLeft}
          isTooltipOpen={isTooltipOpen}
          yScale={yScale}
          chartType={chartType}
          getColor={getColor}
          onX={onX}
          onY={onY}
          onMouseMove={handleMouseMove}
          onMouseLeave={hideTooltip}
        />
        <Axes
          xScale={xScale as AxisScale}
          yScale={yScale as AxisScale}
          innerH={innerH}
        />
      </ChartLayout>
      {isTooltipOpen && renderTooltip && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft! + MARGIN.left + 10}
          className={styles.ChartTooltip}
        >
          {renderTooltip({ data: tooltipData }) as ReactNode}
        </TooltipInPortal>
      )}
    </div>
  );
};

export default ChartContainer;
