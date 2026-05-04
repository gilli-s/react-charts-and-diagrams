import type { FC } from "react";

type DeltaProps = {
  delta: number;
};

const Delta: FC<DeltaProps> = (props) => {
  const { delta } = props;
  const sign = delta > 0 ? "+" : "-";
  const color = delta > 0 ? "#2b8a3c" : "#b53333";
  return (
    <div
      className="flex text-white font-bold px-3"
      style={{ backgroundColor: color }}
    >
      D = {sign} {Math.abs(delta)}
    </div>
  );
};
export default Delta;
