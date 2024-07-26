import { Observable } from "rxjs";
import { DoctorService } from "../../../services/doctor.service";
import { IReportStrategy } from "./report-strategy.interface";
import dayjs from "dayjs";

export class DayReportStrategy implements IReportStrategy {
   constructor(private doctorService: DoctorService) { }

   getStatistics(): Observable<any> {
      const currentDate: string = dayjs().format('YYYY-MM-DD');
      return this.doctorService.getGeneralDoctorStatisticByPeriod(currentDate, currentDate);
   }
}
