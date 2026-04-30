import { useMemo, type FC } from "react";
import ReactECharts from "echarts-for-react";
import type { GasConsumptionChartProps } from "../types";
import { ProgressDiagram } from "./ProgressDiagram";
import { buildOption } from "../utils";

export const GasConsumptionChart: FC<GasConsumptionChartProps> = (props) => {
  const option = useMemo(() => buildOption(props), [props]);

  const {
    title,
    delta,
    rightSideFirstDiagramData,
    rightSideSecondDiagramData,
  } = props.rightSideData;

  return (
    <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden mx-auto">
      {/* ── 3-column body ── */}
      <div className="min-h-105 flex flex-row justify-between">
        {/* Left sidebar */}
        <div className="p-3 flex flex-row gap-4 bg-gray-50 border-r border-gray-200">
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
        <div className="flex grow min-h-100 py-2">
          <ReactECharts
            option={option}
            style={{ width: "100%", height: "100%" }}
            notMerge
            lazyUpdate
          />
        </div>

        {/* Right sidebar */}
        <div className="p-3 flex flex-col gap-4 bg-gray-50 border-l border-gray-200">
          <div className="flex flex-col items-center">
            <div className="text-[12px] text-blue-500 font-bold mb-0.5 uppercase text-center">
              {title}
            </div>
            <span className="inline-block text-center bg-[#27ae60] text-white px-2 py-0.5 rounded-sm text-sm font-bold">
              {delta}
            </span>
          </div>

          <div className="flex flex-row items-end justify-between">
            <div className="flex flex-col items-center">
              <ProgressDiagram
                title={rightSideFirstDiagramData.title}
                fullValue={rightSideFirstDiagramData.fullValue}
                partValue={rightSideFirstDiagramData.partValue}
                perCent={rightSideFirstDiagramData.percentage}
              />
              <div className="text-[#1a5276] font-bold">ПЛАН</div>
            </div>
            <div className="flex flex-col items-center">
              <ProgressDiagram
                title={rightSideSecondDiagramData.title}
                fullValue={rightSideSecondDiagramData.fullValue}
                partValue={rightSideSecondDiagramData.partValue}
                perCent={rightSideSecondDiagramData.percentage}
                fillColor="#e74c3c"
              />
              <div className="text-[#1a5276] font-bold">ФАКТ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
