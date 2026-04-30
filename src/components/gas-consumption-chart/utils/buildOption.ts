/* ── Build ECharts option from dynamic series ── */

import type { EChartsOption } from "echarts";
import type { GasConsumptionChartProps } from "../types";
import { ceilToHundred } from "./ceilToHundred";

export const buildOption = (p: GasConsumptionChartProps): EChartsOption => {
  // X-axis dates from the first series (all series share the same dates)
  const firstSeries = p.chartData.series[0];
  const dates = firstSeries?.chartPoints.map((d) => d.xAxis) ?? [];

  // Auto-calculate yAxis max across all series
  let maxVal = 0;
  for (const s of p.chartData.series) {
    for (const pt of s.chartPoints) {
      if (pt.yAxis !== null && pt.yAxis > maxVal) maxVal = pt.yAxis;
    }
  }
  const yMax = ceilToHundred(maxVal);
  const yInterval = Math.max(100, Math.ceil(yMax / 5 / 100) * 100);

  const labelPositions = ["top", "bottom"] as const;

  // Build series dynamically
  const series = p.chartData.series.map((s) => {
    let labeledIdx = 0; // per-series counter for alternating label positions

    const data = s.chartPoints.map((pt) => {
      const hasLabel = !!pt.label;
      const pos = hasLabel
        ? labelPositions[labeledIdx++ % labelPositions.length]
        : "top";

      return {
        value: pt.yAxis,
        label: hasLabel
          ? {
              show: true,
              position: pos,
              distance: 12,
              formatter: pt.label,
              fontSize: 10,
              color: "#333",
              fontWeight: 700,
            }
          : { show: false },
      };
    });

    return {
      name: s.name,
      type: "line" as const,
      data,
      lineStyle: {
        type: (s.isDashing ? "dotted" : "solid") as "dotted" | "solid",
        color: s.color,
        width: s.isDashing ? 1.5 : 2.5,
      },
      itemStyle: { color: s.color },
      symbol: s.isDashing ? "none" : "circle",
      symbolSize: s.isDashing ? 0 : 6,
      connectNulls: false,
      z: s.isDashing ? 1 : 3,
    };
  });

  return {
    grid: { left: 55, right: 20, top: 35, bottom: 50 },
    xAxis: {
      type: "category",
      data: dates,
      boundaryGap: false,
      axisLabel: {
        interval: 2, // show every 3rd day (dense daily data)
        rotate: 90,
        fontSize: 9,
        color: "#1a5276",
        margin: 12,
        formatter: (value: string) => {
          const months = [
            "янв",
            "фев",
            "мар",
            "апр",
            "май",
            "июн",
            "июл",
            "авг",
            "сен",
            "окт",
            "ноя",
            "дек",
          ];
          const parts = value.split(".");
          if (parts.length !== 3) return value;
          const day = parseInt(parts[0], 10);
          const monthIdx = parseInt(parts[1], 10) - 1;
          if (monthIdx < 0 || monthIdx > 11) return value;
          return `${day} ${months[monthIdx]}`;
        },
      },
      axisTick: { alignWithLabel: true },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: yMax,
      interval: yInterval,
      axisLabel: { fontSize: 10, color: "#1a5276" },
      splitLine: { lineStyle: { type: "dashed", color: "#e0e0e0" } },
    },
    series,
    legend: {
      data: p.chartData.series.map((s) => s.name),
      bottom: 50,
      left: "center",
      itemWidth: 22,
      itemHeight: 2,
      textStyle: { fontSize: 11, color: "#444" },
    },
    tooltip: { trigger: "axis", textStyle: { fontSize: 12 } },
  };
};
