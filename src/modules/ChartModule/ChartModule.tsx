import { FC, useState } from "react";

import {
  IPoints,
  LinesType,
  TimeType,
} from "@modules/ChartModule/types/data.types";
import useData from "@modules/ChartModule/hooks/useData";
import ACTIVE_LINE_OPTIONS from "@modules/ChartModule/constants/activeLineOptions.const";
import TIME_OPTIONS from "@modules/ChartModule/constants/timeOptions.const";
import CHART_TYPE_OPTIONS from "@modules/ChartModule/constants/chartTypeOptions.const";
import LINE_COLORS from "@modules/ChartModule/constants/lineColors.const";
import TooltipContainer from "@modules/ChartModule/containers/TooltipContainer";
import THEME_OPTIONS from "@modules/ChartModule/constants/themeOptions.const";

import ChartWidget from "@widgets/ChartWidget";

import Select from "@shared/components/Select";
import useTheme from "@shared/hooks/useTheme";
import ThemeEnum from "@shared/enums/theme";

import styles from "./ChartModule.module.css";

import { ISelectOptions } from "@appTypes/select.types";

const ChartModule: FC = () => {
  const { theme, setTheme } = useTheme();
  const [chartType, setChartType] = useState<ChartType>("line");

  const { points, active, setActive, timeMode, setTimeMode, variations } =
    useData();

  const handleChangeActive = (active: ISelectOptions<LinesType>): void => {
    setActive(active.value);
  };

  const handleChangeFilterType = (time: ISelectOptions<TimeType>): void => {
    setTimeMode(time.value);
  };

  const handleChangeLineMode = (type: ISelectOptions<ChartType>): void => {
    setChartType(type.value);
  };

  const handleChangeTheme = (theme: ISelectOptions<ThemeEnum>): void => {
    setTheme(theme.value);
  };

  const activeVal = ACTIVE_LINE_OPTIONS.find((a) => a.value === active);
  const timeVal = TIME_OPTIONS.find((t) => t.value === timeMode);
  const typeVal = CHART_TYPE_OPTIONS.find((t) => t.value === chartType);
  const themeVal = THEME_OPTIONS.find((t) => t.value === theme);
  const xAccessor = (p: IPoints): Date => p.date;
  const yAccessor = (p: IPoints): number => p.conversionRate;
  const idAccessor = (p: IPoints): string => p.variationId;
  const getColor = (id: Exclude<LinesType, "all">): string => LINE_COLORS[id];
  const lineVariations = variations.map((v) => String(v?.id ?? 0));
  const activeLine =
    active === "all"
      ? lineVariations
      : lineVariations.filter((l) => l === active);

  return (
    <div className={styles.ChartModuleWrapper}>
      <div className={styles.ChartModuleFilter}>
        <div className={styles.ChartModuleFilterItem}>
          <Select
            value={activeVal}
            options={ACTIVE_LINE_OPTIONS}
            onChange={handleChangeActive}
          />
          <Select
            value={timeVal}
            options={TIME_OPTIONS}
            onChange={handleChangeFilterType}
          />
        </div>
        <div className={styles.ChartModuleFilterItem}>
          <Select
            value={typeVal}
            options={CHART_TYPE_OPTIONS}
            onChange={handleChangeLineMode}
          />
          <Select
            value={themeVal}
            options={THEME_OPTIONS}
            onChange={handleChangeTheme}
          />
        </div>
      </div>
      <div className={styles.ChartModuleChart}>
        <ChartWidget<IPoints, Exclude<LinesType, "all">>
          hasExport
          data={points}
          getColor={getColor}
          chartType={chartType}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          idAccessor={idAccessor}
          activeLine={activeLine}
          renderTooltip={TooltipContainer}
        />
      </div>
    </div>
  );
};

export default ChartModule;
