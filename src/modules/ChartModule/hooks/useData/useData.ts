import { Dispatch, SetStateAction, useState } from "react";

import {
  IPoints,
  IPrePoint,
  IVariations,
  LinesType,
  TimeType,
} from "@modules/ChartModule/types/data.types";

import raw from "../../mock/data.json";
import getIsoWeekStartUtils from "../../utils/getIsoWeekStart";

interface IUseDataReturn {
  points: IPoints[];
  active: LinesType;
  variations: IVariations[];
  setActive: Dispatch<SetStateAction<LinesType>>;
  timeMode: TimeType;
  setTimeMode: Dispatch<SetStateAction<TimeType>>;
}

const useData = (): IUseDataReturn => {
  const [active, setActive] = useState<LinesType>("all");
  const [timeMode, setTimeMode] = useState<TimeType>("day");

  const transformData = (): IPoints[] => {
    const grouped: Record<string, Record<string, IPrePoint>> = {};

    raw.data.forEach((entry) => {
      const date = new Date(entry.date);

      const key =
        timeMode === "week"
          ? getIsoWeekStartUtils(date).toISOString().slice(0, 10)
          : date.toISOString().slice(0, 10);

      if (!grouped[key]) grouped[key] = {};

      Object.keys(entry.visits).forEach((variationId) => {
        const visits =
          entry.visits?.[variationId as keyof typeof entry.visits] ?? 0;
        const conversions =
          entry.conversions[variationId as keyof typeof entry.visits] ?? 0;

        if (!grouped[key][variationId]) {
          grouped[key][variationId] = {
            date: new Date(key),
            variationId,
            visits: 0,
            conversions: 0,
          };
        }

        grouped[key][variationId].visits += visits;
        grouped[key][variationId].conversions += conversions;
      });
    });

    const points: IPoints[] = [];

    Object.values(grouped).forEach((row) => {
      Object.values(row).forEach((item) => {
        const { date, variationId, visits, conversions } = item;

        const conversionRate = visits > 0 ? (conversions / visits) * 100 : 0;

        points.push({
          date,
          variationId,
          conversionRate,
        });
      });
    });

    points.sort((a, b) => a.date.getTime() - b.date.getTime());

    return points;
  };

  const points = transformData();

  return {
    points,
    variations: raw.variations as IVariations[],
    timeMode,
    setTimeMode,
    active,
    setActive,
  };
};

export default useData;
