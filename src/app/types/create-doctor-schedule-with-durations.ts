import { TimeDuration } from "./time-duration";

export interface CreateDoctorScheduleWithDurations {
   date: Date;
   doctorId: number;
   hospitalId: number;
   roomNumber: string;
   durations: TimeDuration[];
}
