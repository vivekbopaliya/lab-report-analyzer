export interface HistoricalData {
  date: string;
  value: number;
}

export interface TrendData {
  parameter: string;
  unit: string;
  data: HistoricalData[];
  normalRange: string;
}

export function getDummyTrendData(): TrendData[] {
  const currentDate = new Date();
  const dates = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - (5 - i));
    return date.toISOString().split('T')[0];
  });

  return [
    {
      parameter: 'Glucose',
      unit: 'mg/dL',
      normalRange: '70-100 mg/dL',
      data: [
        { date: dates[0], value: 85 },
        { date: dates[1], value: 92 },
        { date: dates[2], value: 88 },
        { date: dates[3], value: 95 },
        { date: dates[4], value: 110 },
        { date: dates[5], value: 105 }
      ]
    },
    {
      parameter: 'Hemoglobin', 
      unit: 'g/dL',
      normalRange: '12.0-15.5 g/dL',
      data: [
        { date: dates[0], value: 13.2 },
        { date: dates[1], value: 13.0 },
        { date: dates[2], value: 12.8 },
        { date: dates[3], value: 12.5 },
        { date: dates[4], value: 12.3 },
        { date: dates[5], value: 12.1 }
      ]
    },
    {
      parameter: 'Cholesterol',
      unit: 'mg/dL', 
      normalRange: '<200 mg/dL',
      data: [
        { date: dates[0], value: 180 },
        { date: dates[1], value: 185 },
        { date: dates[2], value: 190 },
        { date: dates[3], value: 195 },
        { date: dates[4], value: 205 },
        { date: dates[5], value: 210 }
      ]
    }
  ];
}