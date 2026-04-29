type ChartDataPoint = {
  xAxis: string; // Дата формата 01.01.2026
  yAxis: number | null; // Значение показателя
  label?: string; // Label значения. Пример: 364 (+40)
};

export type ChartSeriesData = {
  name: string; // Название линии
  color: string; // Цвет линии
  isDashing: boolean; // Признак пунктируемой линии
  chartPoints: ChartDataPoint[]; // Массив точек линии
};

export type ChartData = {
  series: ChartSeriesData[];
};

export type DiagramData = {
  title: string; // Название
  fullValue: string; // Полное значение
  partValue: string; // Часть значения
  percentage: number; // Процент
};

export type ChartCardData = {
  leftSideData: {
    leftSideFirstDiagramData: DiagramData;
    leftSideSecondDiagramData: DiagramData;
  };
  chartData: ChartData;
  rightSideData: {
    title: string; // Наименование в правой области
    delta: string; // Дельта значения
    rightSideFirstDiagramData: DiagramData;
    rightSideSecondDiagramData: DiagramData;
  };
};
