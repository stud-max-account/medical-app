import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AccordionModule } from "primeng/accordion";
import { DoctorAvailableAppointments } from "../../../types/doctor-available-appointments";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CreateVisitForPatientDto } from "../../../dto/create-visit-for-patient.dto";

@Component({
   standalone: true,
   selector: "doctor-appointments-card",
   templateUrl: "./doctor-appointments-card.component.html",
   styleUrl: "./doctor-appointments-card.component.css",
   imports: [FormsModule, CommonModule, AccordionModule]
})
export class DoctorAppointmentsCardComponent {

   @Input("doctorAvailableAppointments") appointmentsDetails: DoctorAvailableAppointments;

   @Output() onAppointmentConfirmed = new EventEmitter()

   selectedTimeId: number | null;

   reasonOfVisiting: string | undefined;

   confirmAppointment() {

      if (this.selectedTimeId == null) {
         return;
      }

      const newPatientVisit: CreateVisitForPatientDto = {
         appointmentDurationId: this.selectedTimeId!,
         reason: this.reasonOfVisiting
      }
      this.onAppointmentConfirmed.emit(newPatientVisit);
   }


}