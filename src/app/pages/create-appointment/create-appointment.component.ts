import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";

import { NgFor, NgIf } from "@angular/common";
import dayjs from "dayjs";
import { HospitalService } from "../../services/hospital.service";
import { DoctorService } from "../../services/doctor.service";
import { CreateDoctorScheduleWithDurations } from "../../types/create-doctor-schedule-with-durations";
import { TimeDuration } from "../../types/time-duration";
import { DoctorScheduleService } from "../../services/doctor-schedule.service";

interface AutoCompleteCompleteEvent {
   originalEvent: Event;
   query: string;
}
interface CreateAppointmentForm {
   date: FormControl<Date | null>;
   timeFrom: FormControl<string | null>;
   timeTo: FormControl<string | null>

   duration: FormControl<number | null>
   doctorId: FormControl<number | null>
   hospitalId: FormControl<number | null>
   roomNumber: FormControl<string | null>
}

@Component({
   standalone: true,
   selector: "create-appointment-page",
   templateUrl: "./create-appointment.component.html",
   styleUrl: "./create-doctor-schedule.css",
   providers: [HospitalService, DoctorScheduleService, DoctorService],
   imports: [NgIf, NgFor, ReactiveFormsModule, CalendarModule, AutoCompleteModule, DropdownModule, InputTextModule]
})
export class CreateAppointmentPageComponent implements OnInit {

   constructor(private hospitalService: HospitalService, private doctorScheduleService: DoctorScheduleService, private doctorService: DoctorService) { }


   createAppointmentForm = new FormGroup<CreateAppointmentForm>({
      date: new FormControl(this.getTomorrowDate(), [Validators.required]),
      timeFrom: new FormControl("09:30", [Validators.required]),
      timeTo: new FormControl("12:30", [Validators.required]),
      duration: new FormControl(30, [Validators.required]),
      doctorId: new FormControl(null, [Validators.required]),
      hospitalId: new FormControl(null, [Validators.required]),
      roomNumber: new FormControl('', [Validators.required])

   });

   hospitalSuggestions: any[] = [];

   doctorSuggestions: any[] = [];

   ngOnInit(): void {
      // when using authorization login doctor
      //this.createAppointmentForm.patchValue({ doctorId: 1 }); // change id


   }




   searchHospital(event: AutoCompleteCompleteEvent) {

      this.hospitalService.findByName(event.query).subscribe(data => {
         this.hospitalSuggestions = data;
      });

   }

   searchDoctors(event: AutoCompleteCompleteEvent) {
      this.doctorService.findByNameOrSurname(event.query).subscribe(data => {
          this.doctorSuggestions = data;
      })
   }



   onSubmit() {

      if (!this.createAppointmentForm.valid) {
         console.log("Invalid")
         return;
      }

      const { date, doctorId, hospitalId, roomNumber, timeFrom, timeTo, duration } = this.createAppointmentForm.value;

      const formattedDate = dayjs(date).format("YYYY-MM-DD");


      const durations: TimeDuration[] = this.generateTimeIntervals(formattedDate, timeFrom!, timeTo!, duration!);

      const preparedData: CreateDoctorScheduleWithDurations = {
         date: date!,
         doctorId: doctorId!,
         hospitalId: hospitalId!,
         roomNumber: roomNumber!,
         durations: durations
      };


      this.doctorScheduleService.createScheduleWithDurations(preparedData).subscribe(data => {
         console.log("Created successfully");
      });

   }


   generateTimeIntervals(date: string, timeFrom: string, timeTo: string, intervalMinutes: number) {

      let startDateTime = dayjs(`${date} ${timeFrom}`, "YYYY-MM-DD HH:mm");
      const endDateTime = dayjs(`${date} ${timeTo}`, "YYYY-MM-DD HH:mm");

      const timeSlices = [];



      while (startDateTime.isBefore(endDateTime)) {

         const nextTime = startDateTime.add(intervalMinutes, 'minute');

         if (nextTime.isAfter(endDateTime)) {
            break;
         }

         timeSlices.push({ startTime: startDateTime.format('HH:mm'), endTime: nextTime.format('HH:mm') });

         startDateTime = nextTime;
      }

      return timeSlices;



   }

   getTomorrowDate() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow;
   }

}
