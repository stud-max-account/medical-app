import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const baseUrl: string = "http://localhost:3000/hospital"

@Injectable()
export class HospitalService {
   constructor(private http: HttpClient) {
   }

   findByName(name: string) {
      return this.http.get<any>(baseUrl + `/find/${name}`);

   }

}
