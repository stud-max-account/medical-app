import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { PatientRegistrationDto } from "../dto/patient-registration-dto";
import { Observable } from "rxjs";
import { AuthorizedUser } from "../types/authorized-user.interface";

const BASE_URL: string = "http://localhost:3000/auth";

@Injectable({
   providedIn: "root"
})
export class AuthService {

   currentUserSignal = signal<AuthorizedUser | undefined | null>(undefined); // null - unathorized



   constructor(private http: HttpClient) {


   }

   login(email: string, password: string) {
      const fullUrl: string = `${BASE_URL}/login`;

      return this.http.post(fullUrl, { email, password });

   }



   registrationPatient(patientRegistrationDto: PatientRegistrationDto) {

      const fullUrl: string = `${BASE_URL}/patient-registration`;

      return this.http.post(fullUrl, patientRegistrationDto);


   }

   getCurrentAuthorizedUser(): Observable<AuthorizedUser> {
      const fullUrl: string = `${BASE_URL}/current-user`;
      return this.http.get<AuthorizedUser>(fullUrl);
   }


   logout() {
      localStorage.removeItem("token");
      this.currentUserSignal.set(null);

   }

}
