export interface ITimeTracking {
  totalWorkedHours: number;
  dailyWorkedHours: Record<number, number>;
  salaryForHours?: number;
  salaryForMonth?: number;
}
