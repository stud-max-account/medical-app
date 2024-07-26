import { CommonModule, NgIf } from '@angular/common';
import { Component, computed, OnInit, Signal  } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule,
} from "ng-apexcharts";
import { ReportItemComponent } from '../../shared/components/report-item/report-item.component';
import { PatientAppointmentCardComponent } from '../../shared/components/patient-appointment-card/patient-appointment-card.component';
import { VisitsByPatientsComponent } from '../../shared/components/visits-by-patients/visits-by-patients.component';
import { PatientGenderStatisticComponent } from '../../shared/components/patient-gender-statistic/patient-gender-statistic.component';
import { DayReportStrategy } from './report-strategies/day-report-strategy';
import { MonthReportStrategy } from './report-strategies/month-report-strategy';
import { YearReportStrategy } from './report-strategies/year-report-strategy';
import { ReportContext } from './report-strategies/report-context';
import { CalendarModule } from 'primeng/calendar';
import { PatientAppointment } from '../../types/patient-appointment';
import { AuthService } from '../../services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { AuthorizedUser } from '../../types/authorized-user.interface';
import dayjs from 'dayjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;

};


@Component({

  selector: 'doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrl: "./doctor-page.component.css",
  standalone: true,
  imports: [CommonModule, NgIf, ReportItemComponent, VisitsByPatientsComponent, PatientGenderStatisticComponent,
  PatientAppointmentCardComponent, NgApexchartsModule, CalendarModule],
  providers: [DoctorService]

})
export class DoctorPageComponent implements OnInit {

  private reportContext: ReportContext;

  report: { injectionsCount: number, surgeriesCount: number, visitsCount: number } = {
    injectionsCount: 0,
    surgeriesCount: 0,
    visitsCount: 0
  }

  countAppointmentsToday = 0;

  patientAppointments: PatientAppointment[] = []


  doctorInfo: Signal<AuthorizedUser>;



  public constructor(private doctorService: DoctorService, private authService: AuthService) {

    this.reportContext = new ReportContext();
    this.doctorInfo = computed(this.authService.currentUserSignal) as Signal<AuthorizedUser>

  }

  ngOnInit(): void {
    this.initialization();
  }


  changeShowingPeriodReport(selectedPeriod: string) {

    switch (selectedPeriod) {
      case "day":
        this.reportContext.setStrategy(new DayReportStrategy(this.doctorService));
        break;
      case "month":
        this.reportContext.setStrategy(new MonthReportStrategy(this.doctorService));
        break;
      case "year":
        this.reportContext.setStrategy(new YearReportStrategy(this.doctorService));
        break;
    }

    this.reportContext.executeStrategy().subscribe((data: any) => {
      this.report = {
        injectionsCount: data.injections,
        surgeriesCount: data.surgeries,
        visitsCount: data.visits

      }
    })

  }

  onReportPeriodChange(event: any) {
    const selectedPeriod = event.target.value;
    this.changeShowingPeriodReport(selectedPeriod);
  }

  getTotalPatients() {
    return this.report.injectionsCount + this.report.surgeriesCount + this.report.visitsCount;
  }



  initialization() {

    this.changeShowingPeriodReport("day");

    this.getAppointmentsToday();
  }

  getAppointmentsToday() {
    this.getAppointmentsByDate(new Date()).subscribe((data: PatientAppointment[]) => {

      this.patientAppointments = data;
      this.countAppointmentsToday = data.length;
    })

  }

  getAppointmentsByDate(date: Date) {

    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    return this.doctorService.getAppointmentsByDate(formattedDate);

  }


  onAppointmentCalendarDateChange(date: Date) {

    this.getAppointmentsByDate(date).subscribe((data: PatientAppointment[]) => {
      this.patientAppointments = data;
    });

  }

}
