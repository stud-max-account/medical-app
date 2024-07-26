import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PatientAppointment } from "../types/patient-appointment";
import { map, Observable } from "rxjs";
import dayjs, { Dayjs } from "dayjs";

const baseUrl: string = "http://localhost:3000/doctors"


type AppointmentData = {
   m: number;
   f: number;
};

type Data = {
   [key: string]: AppointmentData;
};




@Injectable()
export class DoctorService {
   constructor(private http: HttpClient) {


   }



   findByNameOrSurname(value: string) {

      return this.http.get<any>(baseUrl + `/find/${value}`);

   }

   getCountPatientsByYear(year: number) {
      const fullUrl = `${baseUrl}/patients-by-year/${year}`;
      return this.http.get(fullUrl);
   }
   getPatientsByPeriod(startDate: string, endDate: string) {


      const fullUrl = `${baseUrl}/patients-by-period/${startDate}/${endDate}`;
      return this.http.get(fullUrl);



   }

   getPatientsCountForCurrentWeek() {

      const startWeekDate: Dayjs = dayjs().startOf("week");

      const endWeekDate: Dayjs = dayjs().endOf("week");

      const startWeekDateStr = startWeekDate.format("YYYY-MM-DD");

      const endWeekDateDateStr = endWeekDate.format("YYYY-MM-DD");

      return this.getPatientsByPeriod(startWeekDateStr, endWeekDateDateStr).pipe(
         map((data) => this.serializeWeekData(startWeekDate, data as any))
      );

   }

   getPatientsCountForLastWeek() {

      const startWeekDate: Dayjs = dayjs().startOf("week").subtract(7, "day");

      const endWeekDate: Dayjs = dayjs().endOf("week").subtract(7, "day");

      const startWeekDateStr = startWeekDate.format("YYYY-MM-DD");

      const endWeekDateDateStr = endWeekDate.format("YYYY-MM-DD");



      return this.getPatientsByPeriod(startWeekDateStr, endWeekDateDateStr).pipe(

         map((data) => this.serializeWeekData(startWeekDate, data as any))
      );


   }

   serializeWeekData(startDate: Dayjs, data: Data) {

      const appointsByWeek = {
         "mon": { m: 0, f: 0 },
         "tue": { m: 0, f: 0 },
         "wed": { m: 0, f: 0 },
         "thu": { m: 0, f: 0 },
         "fri": { m: 0, f: 0 },
         "sat": { m: 0, f: 0 },
         "sun": { m: 0, f: 0 }
      }


      let iteratedDate = startDate;



      const appointsByWeekKeys = Object.keys(appointsByWeek) as Array<keyof typeof appointsByWeek>;

      for (let key of appointsByWeekKeys) {

         let dateStr: string = iteratedDate.format("YYYY-MM-DD");

         if (data[dateStr]) {

            appointsByWeek[key] = {
               m: data[dateStr].m,
               f: data[dateStr].f
            }

         }

         iteratedDate = iteratedDate.add(1, "day");
      }

      return appointsByWeek;

   }


   getGeneralDoctorStatisticByPeriod(startDate: string, endDate: string) {

      const fullUrl = `${baseUrl}/report/${startDate}/${endDate}`;

      return this.http.get(fullUrl);

   }



   getAppointmentsByDate(date: string): Observable<PatientAppointment[]> {
      const fullUrl = `${baseUrl}/appointments-by-date/${date}`;
      return this.http.get<PatientAppointment[]>(fullUrl);
   }





}
