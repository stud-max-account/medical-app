import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


const BASE_URL: string = "http://localhost:3000/patients";

@Injectable()
export class PatientService {

   constructor(private http: HttpClient) {

   }

   getPatientVisits(patientId: number) {
      const fullUrl = BASE_URL + '/visits/' + patientId;
      return this.http.get(fullUrl);
   }



}