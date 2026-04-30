import type { FC } from "react";

export interface ProgressDiagramProps {
  /** Diagram title (e.g. "План год") */
  title: string;
  /** Full/base value (e.g. "111 104") */
  fullValue: string;
  /** Partial/actual value (e.g. "25 553,92") */
  partValue: string;
  /** Percentage value displayed in the bottom section */
  perCent: number;
  /** Color for the filled/percentage area. Default: teal */
  fillColor?: string;
  /** Color for the remaining area. Default: red */
  restColor?: string;
}

export const ProgressDiagram: FC<ProgressDiagramProps> = ({
  title,
  fullValue,
  partValue,
  perCent,
  restColor = "#e74c3c",
}: ProgressDiagramProps) => {
  // Split title into main label + optional sub-label
  const idx = title.indexOf(" ");
  const titleParts =
    idx === -1
      ? { main: title, sub: undefined as string | undefined }
      : { main: title.slice(0, idx), sub: title.slice(idx + 1) };

  // Format percentage with comma as decimal separator (Russian locale)
  const formattedPercent = perCent.toFixed(1).replace(".", ",");

  // Clamp for proportional split (0–100); text still shows the real value
  const clampedPct = Math.min(100, Math.max(0, perCent));

  return (
    <div className="text-center select-none h-full flex flex-col min-w-20">
      {/* ── Top: Title + Full value (fixed height) ── */}
      <div className="shrink-0">
        <div className="text-[10px] text-gray-400 leading-tight uppercase">
          {titleParts.main}
        </div>
        {titleParts.sub && (
          <div className="text-[10px] text-gray-400 leading-tight uppercase">
            {titleParts.sub}
          </div>
        )}
        <div className="text-lg font-bold text-gray-800 mt-0.5 leading-tight">
          {fullValue}
        </div>
      </div>

      {/* ── Middle: Part value (remaining share) ── */}
      {clampedPct < 100 && (
        <div
          className="flex items-center bg-gray-300 justify-center min-h-0 overflow-hidden transition-[flex-grow] duration-500"
          style={{
            flexGrow: 100 - clampedPct,
          }}
        >
          <span className="text-base font-bold text-gray-800">{partValue}</span>
        </div>
      )}

      {/* ── Bottom: Percentage on red background (proportional share) ── */}
      {clampedPct > 0 && (
        <div
          className="flex items-center justify-center min-h-0 overflow-hidden transition-[flex-grow] duration-500"
          style={{
            flexGrow: clampedPct,
            backgroundColor: restColor,
          }}
        >
          <span className="text-lg font-bold text-white">
            {formattedPercent}%
          </span>
        </div>
      )}
    </div>
  );
};
