export interface IDailyWorkedHours {
  startTime: number;
  endTime: number;
  id: string;
}

export type UserActivitiesDailyWorkedHours = Record<
  number,
  IDailyWorkedHours[]
>;

export interface ITimeTracking {
  dailyWorkedHours: UserActivitiesDailyWorkedHours;
  totalWorkedHours: number;
  salaryForHours?: number;
  salaryForMonth?: number;
}
