import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateVisitForPatientDto } from "../dto/create-visit-for-patient.dto";


const BASE_URL: string = "http://localhost:3000/visits";



@Injectable({
   providedIn: "root"
})
export class VisitService {

   constructor(private http: HttpClient) {

   }

   createVisitForPatient(dto: CreateVisitForPatientDto) {
      const fullUrl = `${BASE_URL}/create-patient-visit`;
      return this.http.post(fullUrl, dto);
   }



}