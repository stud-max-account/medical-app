import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from 'primeng/table';
import { TagModule } from "primeng/tag";
import { ButtonModule } from 'primeng/button';
import { PatientVisits } from "../../../types/patient-visits";
import { TabMenuModule } from "primeng/tabmenu";
import { PatientService } from "../../../services/patient.service";
import { AuthService } from "../../../services/auth.service";
import dayjs from 'dayjs'
import { Router } from "@angular/router";


@Component({
   standalone: true,
   selector: "patient-appointment-page",
   templateUrl: "./patient-appointments-page.component.html",
   styleUrl: "./patient-appointments-page.component.css",
   providers: [PatientService],
   imports: [NgFor, FormsModule, TableModule, TagModule, CommonModule, InputTextModule, ButtonModule, TabMenuModule]
})
export class PatientAppointmentsPageComponent {

   Object = Object;

   tabItems: { label: string, value: string }[] = [{ label: "All visits", value: "All visits" }, { label: "Planned visits", value: "planned" }, { label: "Completed visits", value: "completed" }]

   allAppointments: PatientVisits[] = [];

   appointmentsToShow: PatientVisits[] = [];

   visitsBySpecializations: any = {};

   activeSpeciality: string = 'All specialities';  // extract in a separate type

   activeStatusVisitTab: { label: string, value: string };



   columns!: any[];


   constructor(private router: Router, private patientService: PatientService, private authService: AuthService) {

   }

   ngOnInit() {

      this.getAllPatientAppointments();

      this.activeStatusVisitTab = this.tabItems[0];
      this.columns = [
         { field: 'status', header: 'Status' },
         { field: 'doctor.specialization', header: 'Specialization' },
         { field: 'scheduleDate', header: 'Date and time' },
         { field: 'hospital.name', header: 'Facility' },
         { field: 'doctor.name', header: "Doctor's name" },

      ];

   }

   calculateCountVisitsBySpecializations() {

      this.visitsBySpecializations = this.appointmentsToShow.reduce((acc, curr) => {
         const key = curr.doctor.specialization;


         if (!(key in acc)) {
            acc[key] = [];
         }
         acc[key].push(curr);


         return acc;

      }, {} as any);



   }
   getTotalSpecialization() {
      return Object.keys(this.visitsBySpecializations).reduce((acc, key) => acc + this.visitsBySpecializations[key].length, 0)
   }

   getAllPatientAppointments() {
      const patientId = this.authService.currentUserSignal()?.details.id;

      this.patientService.getPatientVisits(patientId!).subscribe((data: any) => {
         this.allAppointments = data;
         this.appointmentsToShow = data;
         this.calculateCountVisitsBySpecializations();
      })
   }



   setActiveSpeciality(specialityName: string) {

      this.activeSpeciality = specialityName;


      this.filterVisits(this.activeStatusVisitTab);



   }

   filterVisits(visitStatus: { label: string, value: string }) {

      // extract in a separate type
      if (this.activeStatusVisitTab.value == "All visits" && this.activeSpeciality == "All specialities") {
         this.appointmentsToShow = [...this.allAppointments];
         this.calculateCountVisitsBySpecializations();
         return;
      }

      if (this.activeStatusVisitTab.value == "All visits") {
         this.appointmentsToShow = this.allAppointments.filter(a => a.doctor.specialization == this.activeSpeciality);
         return;
      }


      if (this.activeSpeciality == "All specialities") {
         this.appointmentsToShow = this.allAppointments.filter(a => a.status == visitStatus.value);
         this.calculateCountVisitsBySpecializations();
         return;
      }

      this.appointmentsToShow = this.allAppointments.filter(a => a.status == visitStatus.value && a.doctor.specialization == this.activeSpeciality);

   }



   onTabChange(value: { label: string, value: string }) {

      this.activeStatusVisitTab = value;

      this.setActiveSpeciality("All specialities");  // extract in a separate type

   }



   formatDate(dateStr: string) {
      return dayjs(dateStr).format('D MMM YYYY');
   }

   getSeverity(status: string) {
      switch (status) {
         case 'planned':
            return 'success';

         default:
            return 'info';
      }
   }


   navigateToFindAppointments() {
      this.router.navigateByUrl('/patient/find-appointments');
   }

}
