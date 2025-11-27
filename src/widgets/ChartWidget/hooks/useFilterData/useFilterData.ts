import { useMemo } from "react";
import { scaleTime, scaleLinear, ScaleConfigToD3Scale } from "@visx/scale";
import { ScaleConfig } from "@visx/scale/lib/types/ScaleConfig";

import {
  IFilterDataReturn,
  UseFilterDataProps,
} from "@widgets/ChartWidget/types/chart.types";

const useFilterData = <D extends object>({
  data,
  xAccessor,
  yAccessor,
  idAccessor,
  activeLine = [],
  innerH,
  innerW,
}: UseFilterDataProps<D>): IFilterDataReturn<D> => {
  const filtered = useMemo(
    () => data.filter((d) => activeLine.includes(idAccessor(d))),
    [data, activeLine, idAccessor],
  );

  const grouped = useMemo(() => {
    const map: Record<string, D[]> = {};

    filtered.forEach((d) => {
      const id = idAccessor(d);
      if (!map[id]) map[id] = [];
      map[id].push(d);
    });

    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => xAccessor(a).getTime() - xAccessor(b).getTime()),
    );

    return map;
  }, [filtered, xAccessor, idAccessor]);

  const xScaleOriginal = useMemo<ScaleConfigToD3Scale<ScaleConfig>>(() => {
    const allDates = filtered.map((d) => xAccessor(d).getTime());
    return scaleTime({
      domain: [Math.min(...allDates), Math.max(...allDates)],
      range: [0, innerW],
    });
  }, [filtered, innerW, xAccessor]);

  const yScale = useMemo(() => {
    const values = filtered.map((d) => yAccessor(d));
    return scaleLinear({
      domain: [0, Math.max(...values) * 1.1],
      range: [innerH, 0],
      nice: true,
    });
  }, [filtered, innerH, yAccessor]);

  return {
    filtered,
    grouped,
    xScaleOriginal,
    yScale,
  };
};

export default useFilterData;
