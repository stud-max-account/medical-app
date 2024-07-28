import { Component, OnInit } from "@angular/core";
import { DoctorAvailableAppointments } from "../../../types/doctor-available-appointments";
import { DoctorScheduleService } from "../../../services/doctor-schedule.service";
import { DoctorAppointmentsCardComponent } from "../../../shared/components/doctor-appointments-card/doctor-appointments-card.component";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { SpecializationService } from "../../../services/specialization.service";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { CreateVisitForPatientDto } from "../../../dto/create-visit-for-patient.dto";
import { VisitService } from "../../../services/visit.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
   standalone: true,
   selector: "make-appointment-page",
   templateUrl: "./make-appointment-page.component.html",
   styleUrl: "./make-appointment-page.component.css",
   imports: [NgIf, FormsModule, DoctorAppointmentsCardComponent, DropdownModule, CalendarModule]

})
export class MakeAppointmentPageComponent implements OnInit {

   doctorAvailableAppointments: DoctorAvailableAppointments[] = [];

   doctorSpecializations: { id: number; name: string; }[];


   appointmentDate: string = new Date().toDateString();

   selectedSpecializationId: number | null = null;



   isDoctorAvailableAppointmentsLoading: boolean = false;

   minDate = new Date();



   constructor(
      private router: Router,
      private doctorScheduleService: DoctorScheduleService,
      private specializationService: SpecializationService,
      private visitService: VisitService,
      private toastr: ToastrService

   ) {


   }
   ngOnInit(): void {
      this.specializationService.getAll().subscribe((data: any) => {
         this.doctorSpecializations = data;
      })
   }

   findAppointments() {
      this.isDoctorAvailableAppointmentsLoading = true;
      this.doctorScheduleService.getAvailableAppointments(this.appointmentDate, this.selectedSpecializationId!).subscribe((data: any) => {
         this.doctorAvailableAppointments = data;
         this.isDoctorAvailableAppointmentsLoading = false;
         if (data.length == 0) {
            this.toastr.info("There are no available appointments on that date", "No data found");
         }
      });
   }
   onAppointmentConfirmedHandler(newPatientVisitData: CreateVisitForPatientDto) {

      this.visitService.createVisitForPatient(newPatientVisitData).subscribe(() => {
         this.router.navigateByUrl("/patient/my-appointments");
      })


   }

}