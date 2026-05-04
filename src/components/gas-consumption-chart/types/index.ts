// ── Chart data types (as defined in chart-data-types.ts) ──

export interface ChartDataPoint {
  /** Date string, e.g. "01.01.2026" */
  xAxis: string;
  /** Value. null = gap (line break) */
  yAxis: number | null;
  /** Label near the point. Only shown when present. E.g. "364 (+40)" */
  label?: string;
}

export interface ChartSeriesData {
  /** Line name (shown in legend) */
  name: string;
  /** Line color */
  color: string;
  /** Whether the line is dashed */
  isDashing: boolean;
  /** Array of data points */
  chartPoints: ChartDataPoint[];
}

export interface ChartData {
  series: ChartSeriesData[];
}

// ── Sidebar diagram types ──

export interface DiagramData {
  title: string;
  fullValue: string;
  partValue: string;
  percentage: number;
}

export type RightSideDiagramData = {
  factValue: number;
  percentage: number;
};

// ── Full card payload (JSON-driven) ──

export interface ChartCardData {
  title: string;
  leftSideData: {
    leftSideFirstDiagramData: DiagramData;
    leftSideSecondDiagramData: DiagramData;
  };
  chartData: ChartData;
  rightSideData: {
    title: string;
    delta: number;
    planValue: number;
    factDiagram: RightSideDiagramData;
  };
}

// ── Component props = ChartCardData + display metadata ──

export type GasConsumptionChartProps = ChartCardData;
