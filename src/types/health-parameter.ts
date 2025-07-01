export interface HealthParameter {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  isAbnormal?: boolean;
}

export interface TrendData {
  parameter: string;
  unit: string;   
  normalRange: string;
  data: {
    date: string; // ISO date string
    value: number; // Numeric value for the parameter
  }[];
}