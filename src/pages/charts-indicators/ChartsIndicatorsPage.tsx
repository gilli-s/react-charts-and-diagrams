import { useState, useMemo, type FC } from "react";
import { GasConsumptionChart } from "@/components/gas-consumption-chart";
import type { GasConsumptionChartProps } from "../../components/gas-consumption-chart/types";
import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import { DatePicker } from "@consta/uikit/DatePicker";

// ── Mock sets (order must match DATE_OPTIONS) ──
// set-0 (root mocks)
import mar1 from "./mocks/demoData.json";
import mar2 from "./mocks/demoData2.json";
import mar3 from "./mocks/demoData3.json";
import mar4 from "./mocks/demoData4.json";
import mar5 from "./mocks/demoData5.json";
import mar6 from "./mocks/demoData6.json";
// set-1
import aug1 from "./mocks/set-1/demoData.json";
import aug2 from "./mocks/set-1/demoData2.json";
import aug3 from "./mocks/set-1/demoData3.json";
import aug4 from "./mocks/set-1/demoData4.json";
import aug5 from "./mocks/set-1/demoData5.json";
import aug6 from "./mocks/set-1/demoData6.json";
// set-2
import nov1 from "./mocks/set-2/demoData.json";
import nov2 from "./mocks/set-2/demoData2.json";
import nov3 from "./mocks/set-2/demoData3.json";
import nov4 from "./mocks/set-2/demoData4.json";
import nov5 from "./mocks/set-2/demoData5.json";
import nov6 from "./mocks/set-2/demoData6.json";

// ══ The ONLY place you need to change dates ══
const DATE_OPTIONS = [
  new Date(2025, 2, 4), // 04.03.2025
  new Date(2025, 7, 7), // 07.08.2025
  new Date(2025, 10, 23), // 23.11.2025
] as const;

const dateToKey = (d: Date) =>
  `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;

const mocksByDate: Record<string, GasConsumptionChartProps[]> = {
  [dateToKey(DATE_OPTIONS[0])]: [mar1, mar2, mar3, mar4, mar5, mar6],
  [dateToKey(DATE_OPTIONS[1])]: [aug1, aug2, aug3, aug4, aug5, aug6],
  [dateToKey(DATE_OPTIONS[2])]: [nov1, nov2, nov3, nov4, nov5, nov6],
};

// Derived from DATE_OPTIONS — disable all dates between the allowed ones.
// Consta ranges are half-open [start, end), so the end is the next allowed date itself.
const DAY_MS = 86_400_000;
const disabledDateRanges: Array<Date | [Date, Date]> = DATE_OPTIONS.slice(
  0,
  -1,
).map(
  (d, i) =>
    [new Date(d.getTime() + DAY_MS), DATE_OPTIONS[i + 1]] as [Date, Date],
);

const ChartsIndicatorsPage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(DATE_OPTIONS[0]);

  const currentMocks = useMemo(
    () =>
      mocksByDate[dateToKey(selectedDate)] ??
      mocksByDate[dateToKey(DATE_OPTIONS[0])],
    [selectedDate],
  );

  return (
    <Theme preset={presetGpnDefault}>
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

        {/* ── Date row with picker ── */}
        <div className="px-4 py-1.5 text-[15px] text-blue-600 font-bold bg-gray-50 border-b border-gray-200 flex items-center justify-center gap-2">
          <span>по состоянию на</span>
          <div className="w-36 shrink-0">
            <DatePicker
              value={selectedDate}
              onChange={(value) => value && setSelectedDate(value)}
              minDate={DATE_OPTIONS[0]}
              maxDate={DATE_OPTIONS[2]}
              disableDates={disabledDateRanges}
              size="s"
              format="dd.MM.yyyy"
            />
          </div>
        </div>

        {/* ── Scrollable charts ── */}
        <div className="overflow-y-auto max-h-[calc(100vh-100px)]">
          {currentMocks.map((data, idx) => (
            <GasConsumptionChart key={idx} {...data} />
          ))}
        </div>
      </div>
    </Theme>
  );
};
export default ChartsIndicatorsPage;
