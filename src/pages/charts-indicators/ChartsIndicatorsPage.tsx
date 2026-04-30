import { type FC } from "react";
import { GasConsumptionChart } from "@/components/gas-consumption-chart";
import type { GasConsumptionChartProps } from "../../components/gas-consumption-chart/types";
import demoData from "./mocks/demoData.json";

const typedData = demoData as GasConsumptionChartProps;

const ChartsIndicatorsPage: FC = () => {
  return (
    <div className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden mx-auto">
      {/* ── Blue header ── */}
      <div className="bg-[#1a5276] flex items-center flex-row">
        <div className="text-[15px] py-2 text-center flex grow items-center justify-center text-white font-bold uppercase">
          Основные показатели
          <br /> в сравнении с утвержденными показателями газа за 1990 год
          <br /> (СДД от 2007 №5)
        </div>
        <div className="bg-[#67ff76] flex self-stretch items-center text-black font-bold text-sm whitespace-nowrap px-3 py-2">
          СД 4242
        </div>
      </div>

      {/* ── Date row ── */}
      <div className="px-4 py-1.5 text-[15px] text-blue-600 font-bold bg-gray-50 border-b border-gray-200 text-center">
        по состоянию на 01.01.2023
      </div>

      {/* ── Blue что-то ── */}
      <div className="bg-[#1a5276] py-2 text-white text-[15px] font-bold items-center text-center">
        Универсальная группа показателей
      </div>

      {/** ── Chart ── */}
      <GasConsumptionChart {...typedData} />
    </div>
  );
};
export default ChartsIndicatorsPage;
