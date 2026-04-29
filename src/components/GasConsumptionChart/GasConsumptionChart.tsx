import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import type { GasConsumptionChartProps } from "./types";
import { ProgressDiagram } from "./ProgressDiagram";

/* ── Helpers ── */

/** Round up to nearest multiple of 100, clamped so there is headroom */
function ceilToHundred(val: number): number {
  const ceil = Math.ceil(val / 100) * 100;
  return ceil === val ? ceil + 100 : ceil;
}

/* ── Build ECharts option from dynamic series ── */

function buildOption(p: GasConsumptionChartProps): EChartsOption {
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
        color: "#666",
        margin: 12,
      },
      axisTick: { alignWithLabel: true },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: yMax,
      interval: yInterval,
      axisLabel: { fontSize: 10, color: "#666" },
      splitLine: { lineStyle: { type: "dashed", color: "#e0e0e0" } },
    },
    series,
    legend: {
      data: p.chartData.series.map((s) => s.name),
      bottom: 0,
      left: "center",
      itemWidth: 22,
      itemHeight: 2,
      textStyle: { fontSize: 11, color: "#444" },
    },
    tooltip: { trigger: "axis", textStyle: { fontSize: 12 } },
  };
}

/* ── Main component ── */

export function GasConsumptionChart(props: GasConsumptionChartProps) {
  const option = useMemo(() => buildOption(props), [props]);

  return (
    <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden max-w-[960px] mx-auto">
      {/* ── Blue header ── */}
      <div className="bg-[#1a5276] text-white px-4 py-2.5 flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-bold uppercase tracking-[0.5px]">
            two
          </div>
          <div className="text-xs opacity-90 mt-0.5">one</div>
        </div>
        <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
          2334
          <span className="bg-[#2980b9] px-2.5 py-0.5 rounded-sm font-semibold">
            № 1
          </span>
        </div>
        <div className="bg-[#27ae60] text-white px-3.5 py-1 rounded-sm font-bold text-sm whitespace-nowrap">
          СД
        </div>
      </div>

      {/* ── Date row ── */}
      <div className="px-4 py-1.5 text-xs text-gray-600 bg-gray-50 border-b border-gray-200">
        по состоянию на{" "}
        <span className="inline-block bg-[#2980b9] text-white px-2.5 py-px rounded-sm ml-1 font-semibold">
          01.01.2023
        </span>
      </div>

      {/* ── 3-column body ── */}
      <div className="grid grid-cols-[150px_1fr_150px] min-h-[420px]">
        {/* Left sidebar */}
        <div className="p-3 flex flex-col gap-4 bg-gray-50 border-r border-gray-200">
          <ProgressDiagram
            title={props.leftSideData.leftSideFirstDiagramData.title}
            fullValue={props.leftSideData.leftSideFirstDiagramData.fullValue}
            partValue={props.leftSideData.leftSideFirstDiagramData.partValue}
            perCent={props.leftSideData.leftSideFirstDiagramData.percentage}
          />
          <ProgressDiagram
            title={props.leftSideData.leftSideSecondDiagramData.title}
            fullValue={props.leftSideData.leftSideSecondDiagramData.fullValue}
            partValue={props.leftSideData.leftSideSecondDiagramData.partValue}
            perCent={props.leftSideData.leftSideSecondDiagramData.percentage}
            fillColor="#f06292"
          />
        </div>

        {/* Chart */}
        <div className="relative min-h-[400px] py-2">
          <ReactECharts
            option={option}
            style={{ width: "100%", height: "100%" }}
            notMerge
            lazyUpdate
          />
        </div>

        {/* Right sidebar */}
        <div className="p-3 flex flex-col gap-4 bg-gray-50 border-l border-gray-200">
          <div>
            <div className="text-[10px] text-gray-400 mb-0.5 uppercase text-center">
              {props.rightSideData.title}
            </div>
            <span className="inline-block w-full text-center bg-[#27ae60] text-white px-2 py-0.5 rounded-sm text-sm font-bold">
              {props.rightSideData.delta}
            </span>
          </div>
          <ProgressDiagram
            title={props.rightSideData.rightSideFirstDiagramData.title}
            fullValue={props.rightSideData.rightSideFirstDiagramData.fullValue}
            partValue={props.rightSideData.rightSideFirstDiagramData.partValue}
            perCent={props.rightSideData.rightSideFirstDiagramData.percentage}
          />
          <ProgressDiagram
            title={props.rightSideData.rightSideSecondDiagramData.title}
            fullValue={props.rightSideData.rightSideSecondDiagramData.fullValue}
            partValue={props.rightSideData.rightSideSecondDiagramData.partValue}
            perCent={props.rightSideData.rightSideSecondDiagramData.percentage}
            fillColor="#e74c3c"
          />
        </div>
      </div>
    </div>
  );
}
