import { Observable } from "rxjs";
import { DoctorService } from "../../../services/doctor.service";
import { IReportStrategy } from "./report-strategy.interface";
import dayjs from "dayjs";

export class MonthReportStrategy implements IReportStrategy {
   constructor(private doctorService: DoctorService) { }

   getStatistics(): Observable<any> {
      const startMonthDate: string = dayjs().startOf('M').format('YYYY-MM-DD');
      const endMonthDate: string = dayjs().endOf('M').format('YYYY-MM-DD');
      return this.doctorService.getGeneralDoctorStatisticByPeriod(startMonthDate, endMonthDate);
   }
}


