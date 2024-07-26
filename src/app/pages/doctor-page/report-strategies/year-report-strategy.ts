import { Observable } from "rxjs";
import { IReportStrategy } from "./report-strategy.interface";
import { DoctorService } from "../../../services/doctor.service";
import dayjs from "dayjs";

export class YearReportStrategy implements IReportStrategy {
   constructor(private doctorService: DoctorService) { }

   getStatistics(): Observable<any> {
      const startYearDate: string = dayjs().startOf('y').format('YYYY-MM-DD');
      const endYearDate: string = dayjs().endOf('y').format('YYYY-MM-DD');
      return this.doctorService.getGeneralDoctorStatisticByPeriod(startYearDate, endYearDate);
   }
}
