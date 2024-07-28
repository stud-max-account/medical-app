import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


const BASE_URL: string = "http://localhost:3000/specialization";



@Injectable({
   providedIn: "root"
})
export class SpecializationService {

   constructor(private http: HttpClient) {

   }

   getAll() {
      const fullUrl = BASE_URL + '/all';
      return this.http.get(fullUrl);
   }



}