export interface HealthParameter {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  isAbnormal?: boolean;
}
