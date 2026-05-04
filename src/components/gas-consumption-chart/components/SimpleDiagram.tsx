import { type FC } from "react";
import { twMerge } from "tailwind-merge";

type SimpleDiagramProps = {
  value: number;
  percentage?: number;
  name: string;
  classNameContainer?: string;
};

const SimpleDiagram: FC<SimpleDiagramProps> = (props) => {
  const { value, percentage, classNameContainer, name } = props;
  const color = percentage ? "#e74c3c" : "#d1d5dc";

  return (
    <div
      className={twMerge(
        "min-w-20 flex flex-col gap-2 items-center justify-end",
        classNameContainer,
      )}
    >
      <div className="flex">{value}</div>
      <div
        className="flex grow w-full"
        style={{ backgroundColor: color }}
      ></div>
      <div className="flex font-bold">{name}</div>
    </div>
  );
};
export default SimpleDiagram;
