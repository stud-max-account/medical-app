import { Component, OnInit } from "@angular/core";
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexResponsive, NgApexchartsModule } from "ng-apexcharts";
import { DoctorService } from "../../../services/doctor.service";
import { NgIf } from "@angular/common";
import dayjs from "dayjs";


export type GenderDonutChartOptions = {
   series: ApexNonAxisChartSeries;
   chart: ApexChart;
   responsive: ApexResponsive[];
   legend: ApexLegend;
   labels: any;

}

@Component({
   standalone: true,
   selector: "patient-gender-statistic",
   templateUrl: "./patient-gender-statistic.component.html",
   imports: [NgIf, NgApexchartsModule]
})
export class PatientGenderStatisticComponent implements OnInit {

   public genderDonutOptions: GenderDonutChartOptions;

   lastThreeYears: number[] = []

   isLoading: boolean = false;

   series: number[] = [];

   constructor(private doctorService: DoctorService) {

   }
   ngOnInit(): void {
      this.initGenderDonutChart();

      this.getLastThreeYears();
      this.getCountPatientsByYear(this.lastThreeYears[0]);

   }


   initGenderDonutChart() {

      this.genderDonutOptions = {
         series: [0, 0],
         chart: {
            type: "donut",
            width: 400,

         },
         legend: {
            position: "bottom"
         },
         labels: ["Man", "Woman"],

         responsive: [
            {
               breakpoint: 440,
               options: {
                  chart: {
                     width: 400
                  },
                  legend: {
                     position: "bottom"
                  }
               }
            }
         ]
      }
   }

   getCountPatientsByYear(year: number) {
      this.isLoading = true;
      this.doctorService.getCountPatientsByYear(year).subscribe((data: any) => {

         if (data != null) {
            this.series = Array.from([data.m, data.f])
         } else {
            this.series = []
         }
         this.isLoading = false;

      });
   }

   getLastThreeYears() {
      const date = dayjs();
      const years = [0, 1, 2].map(value => date.subtract(value, "y").year());
      this.lastThreeYears = years;

   }
   onSelectedYearChange(event: any) {
      const newYear = event.target.value;
      this.getCountPatientsByYear(newYear)

   }
}
