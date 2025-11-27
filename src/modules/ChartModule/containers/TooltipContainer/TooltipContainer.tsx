import { FC } from "react";
import { timeFormat } from "d3-time-format";

import CalendarIcon from "@assets/icons/calendar.svg?react";
import BestIcon from "@assets/icons/best.svg?react";

import { IPoints, LinesType } from "@modules/ChartModule/types/data.types";
import LINE_COLORS from "@modules/ChartModule/constants/lineColors.const";
import ACTIVE_LINE_OPTIONS from "@modules/ChartModule/constants/activeLineOptions.const";

import styles from "./TooltipContainer.module.css";

interface ITooltipContainerProps {
  data: IPoints[];
}

const TooltipContainer: FC<ITooltipContainerProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const sorted = [...data].sort((a, b) => b.conversionRate - a.conversionRate);

  const best = sorted[0];

  const formatDate = timeFormat("%d/%m/%Y");
  const dateLabel = formatDate(new Date(sorted[0].date));

  return (
    <div className={styles.TooltipContainer}>
      <div className={styles.TooltipContainerCalendar}>
        <CalendarIcon />
        {dateLabel}
      </div>

      <div className={styles.TooltipContainerDivider} />

      {sorted.map((item) => {
        const isWinner = item === best;
        const variationNames = ACTIVE_LINE_OPTIONS.find(
          (l) => l.value === (item.variationId as Exclude<LinesType, "all">),
        );

        return (
          <div key={item.variationId} className={styles.TooltipContainerItem}>
            <div
              className={styles.TooltipContainerItemText}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                className={styles.TooltipContainerItemTextDot}
                style={{
                  background:
                    LINE_COLORS[item.variationId as Exclude<LinesType, "all">],
                }}
              />
              <span
                className={styles.TooltipContainerItemTextTitle}
                style={{ fontSize: 15, fontWeight: 500 }}
              >
                {variationNames?.label ?? `Variation ${item.variationId}`}
              </span>

              {isWinner && (
                <div className={styles.TooltipContainerItemTextBest}>
                  <BestIcon />
                </div>
              )}
            </div>

            <div style={{ fontSize: 16, fontWeight: 600 }}>
              {item.conversionRate.toFixed(2)}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TooltipContainer;
