import { Component, OnInit } from "@angular/core";
import { ChartOptions } from "../../../pages/doctor-page/doctor-page.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgIf } from "@angular/common";
import { DoctorService } from "../../../services/doctor.service";
import dayjs from "dayjs";
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
   weekStart: 1,
})

@Component({
   standalone: true,
   selector: "visits-by-patients",
   templateUrl: "./visits-by-patients.component.html",
   imports: [NgIf, NgApexchartsModule],
   providers: [DoctorService]
})
export class VisitsByPatientsComponent implements OnInit {

   public chartOptions: ChartOptions;

   constructor(private doctorService: DoctorService) {

   }
   ngOnInit(): void {
      this.initChart();
      this.getPatientsCountForCurrentWeek();
   }


   initChart() {
      this.chartOptions = {

         series: [
            {
               name: "Man",
               data: [10, 41, 35, 51, 49, 62, 69, 91, 0],
               color: "#825ac8"
            },
            {
               name: "Women",
               data: [40, 22, 34, 21, 19, 32, 79, 101, 158],
               color: "#09c347"
            }
         ],
         chart: {
            height: 350,
            width: 400,
            type: "line",
            zoom: {
               enabled: false
            },
            toolbar: {
               show: false
            },

         },

         dataLabels: {
            enabled: false

         },

         stroke: {
            curve: "straight"
         },

         grid: {
            row: {
               colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
               opacity: 0.5
            }
         },
         xaxis: {
            categories: [
               "Mon",
               "Tue",
               "Wed",
               "Thu",
               "Fri",
               "Sat",
               "Sun"
            ]

         }

      };
   }
   getPatientsCountForCurrentWeek() {
      this.doctorService.getPatientsCountForCurrentWeek().subscribe(visitsByDays => {
         this.setSeriesForChart(visitsByDays);
      });
   }
   getPatientsCountForLastWeek() {
      this.doctorService.getPatientsCountForLastWeek().subscribe(visitsByDays => {
         this.setSeriesForChart(visitsByDays);
      });
   }



   onSelectedWeekChange(event: any) {

      const selectedWeek = event.target.value;

      if (selectedWeek == "current") {
         this.getPatientsCountForCurrentWeek();
      } else {
         this.getPatientsCountForLastWeek();
      }


   }

   setSeriesForChart(visitsByDays: any) {

      const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

      const maleData = days.map(day => visitsByDays[day].m);
      const femaleData = days.map(day => visitsByDays[day].f);



      this.chartOptions = {
         ...this.chartOptions,
         series: [
            {
               ...this.chartOptions.series[0],
               data: maleData
            },
            {
               ...this.chartOptions.series[1],
               data: femaleData
            }
         ]
      };
   }

}