import { HttpClient } from "@angular/common/http";
import { CreateDoctorScheduleWithDurations } from "../types/create-doctor-schedule-with-durations";
import { Injectable } from "@angular/core";

const BASE_URL: string = 'http://localhost:3000/doctor-schedule';

@Injectable()
export class DoctorScheduleService {
   constructor(private http: HttpClient) {


   }

   createScheduleWithDurations(data: CreateDoctorScheduleWithDurations) {

      const fullUrl = `${BASE_URL}/create`;
      return this.http.post(fullUrl, data);


   }
   getAvailableAppointments() {
      const fullUrl = `${BASE_URL}/available-appointments`;
      return this.http.get(fullUrl);
   }



}
