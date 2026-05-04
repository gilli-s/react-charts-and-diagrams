import { useMemo, type FC } from "react";
import ReactECharts from "echarts-for-react";
import type { GasConsumptionChartProps } from "../types";
import { ProgressDiagram } from "./ProgressDiagram";
import { buildOption } from "../utils";
import Delta from "./Delta";
import SimpleDiagram from "./SimpleDiagram";

export const GasConsumptionChart: FC<GasConsumptionChartProps> = (props) => {
  const option = useMemo(() => buildOption(props), [props]);
  const { title: titleChart } = props;

  const { title, delta, planValue, factDiagram } = props.rightSideData;
  const { factValue, percentage } = factDiagram;

  return (
    <>
      {/* ── Blue что-то ── */}
      <div className="bg-[#1a5276] py-2 text-white text-[15px] font-bold items-center text-center">
        {titleChart}
      </div>
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
              <Delta delta={delta} />
            </div>
            <div className="flex flex-col grow justify-end pb-[30%]">
              <div className="flex flex-row grow items-end justify-between">
                <SimpleDiagram
                  value={planValue}
                  name="ПЛАН"
                  classNameContainer={
                    planValue > factValue ? "h-full" : "h-1/2"
                  }
                />
                <SimpleDiagram
                  value={factValue}
                  name="ФАКТ"
                  classNameContainer={
                    planValue > factValue ? "h-1/2" : "h-full"
                  }
                  percentage={percentage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
