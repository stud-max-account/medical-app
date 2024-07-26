import { Component, Input } from "@angular/core";
import { PatientAppointment } from "../../../types/patient-appointment";

@Component({
   selector: "patient-appointment-card",
   templateUrl: "./patient-appointment-card.component.html",
   standalone: true
})
export class PatientAppointmentCardComponent {

   @Input() patientAppointment: PatientAppointment;

}
