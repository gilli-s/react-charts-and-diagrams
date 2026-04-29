import { GasConsumptionChart } from "./components/GasConsumptionChart";
import type { GasConsumptionChartProps } from "./components/GasConsumptionChart";
import demoData from "./demoData.json";

const typedData = demoData as GasConsumptionChartProps;

function App() {
  return (
    <div className="px-4 py-6 max-w-[1000px] mx-auto">
      <GasConsumptionChart {...typedData} />
    </div>
  );
}

export default App;
