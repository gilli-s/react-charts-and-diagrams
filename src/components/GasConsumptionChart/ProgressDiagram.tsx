export interface ProgressDiagramProps {
  /** Diagram title (e.g. "План год") */
  title: string;
  /** Full/base value (e.g. "111 104") */
  fullValue: string;
  /** Partial/actual value (e.g. "25 553,92") */
  partValue: string;
  /** Percentage that drives the fill width */
  perCent: number;
  /** Color for the filled/percentage area. Default: teal */
  fillColor?: string;
  /** Color for the remaining area. Default: red */
  restColor?: string;
}

export function ProgressDiagram({
  title,
  fullValue,
  partValue,
  perCent,
  fillColor = "#5dade2",
  restColor = "#e74c3c",
}: ProgressDiagramProps) {
  // Clamp for the bar width (0–100); text still shows the real value
  const barPct = Math.min(100, Math.max(0, perCent));

  // Split title into main label + optional sub-label
  const idx = title.indexOf(" ");
  const titleParts =
    idx === -1
      ? { main: title, sub: undefined as string | undefined }
      : { main: title.slice(0, idx), sub: title.slice(idx + 1) };

  const hasOverflow = perCent > 100;

  return (
    <div className="text-center select-none">
      {/* ── Title ── */}
      <div className="text-[10px] text-gray-400 leading-tight uppercase">
        {titleParts.main}
      </div>
      {titleParts.sub && (
        <div className="text-[10px] text-gray-400 leading-tight uppercase">
          {titleParts.sub}
        </div>
      )}

      {/* ── Full value ── */}
      <div className="text-lg font-bold text-gray-800 mt-0.5 mb-2 leading-tight">
        {fullValue}
      </div>

      {/* ── Split progress bar ── */}
      <div className="flex rounded-sm overflow-hidden h-[26px]">
        {/* Filled percentage area (left) */}
        {barPct > 0 && (
          <div
            className="flex items-center justify-center text-xs font-bold min-w-[44px] transition-[width] duration-500"
            style={{
              width: `${barPct}%`,
              backgroundColor: fillColor,
            }}
          >
            <span className="text-[#c0392b] drop-shadow-sm">
              {perCent.toFixed(1).replace(".", ",")}%
            </span>
          </div>
        )}

        {/* Remaining area (right) */}
        {barPct < 100 && (
          <div
            className="flex items-center justify-center text-white text-xs font-bold min-w-[44px] transition-[width] duration-500"
            style={{
              width: `${100 - barPct}%`,
              backgroundColor: restColor,
            }}
          >
            {partValue}
          </div>
        )}
      </div>

      {/* Overflow badge when > 100% */}
      {hasOverflow && (
        <div className="mt-1 text-[10px] text-gray-400">
          &gt;100 % — показано как 100 %
        </div>
      )}
    </div>
  );
}
