export interface HealthParameter {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  isAbnormal?: boolean;
  aiInsight?: string;
}

export interface TrendData {
  parameter: string;
  unit: string;   
  normalRange: string;
  data: {
    date: string; 
    value: number; 
  }[];
}