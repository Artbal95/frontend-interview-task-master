import { forwardRef, PropsWithChildren } from "react";

interface IChartLayoutProps extends PropsWithChildren {
  width: number;
  height: number;
  innerW: number;
  innerH: number;
  containerRef: (element: HTMLElement | SVGElement | null) => void;
}

const ChartLayout = forwardRef<SVGSVGElement, IChartLayoutProps>(
  ({ width, height, innerW, innerH, containerRef, children }, svgRef) => {
    const handleGetRef = (el: SVGSVGElement | null): void => {
      if (svgRef && "current" in svgRef) svgRef.current = el;
      containerRef(el);
    };

    return (
      <svg ref={handleGetRef} width={width} height={height}>
        <defs>
          <clipPath id="clip">
            <rect x="0" y="0" width={innerW} height={innerH} />
          </clipPath>
        </defs>

        {children}
      </svg>
    );
  },
);

export default ChartLayout;
