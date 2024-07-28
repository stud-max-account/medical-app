import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DoctorPageComponent } from './pages/doctor-page/doctor-page.component';
import { authGuard } from './_guards/auth.guard';
import { MainPageComponent } from './pages/main/main-page.component';
import { AuthPageComponent } from './pages/auth/auth-page.component';
import { PatientPageComponent } from './pages/patient/patient-page.component';
import { PatientAppointmentsPageComponent } from './pages/patient/appointments/patient-appointments-page.component';
import { BrainTumorDetectionPageComponent } from './pages/brain-tumor-detection/brain-tumor-detection-page.component';
import { MakeAppointmentPageComponent } from './pages/patient/make-appointment/make-appointment-page.component';
import { CreateAppointmentPageComponent } from './pages/create-appointment/create-appointment.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'tumor-detection', component: BrainTumorDetectionPageComponent },
  { path: 'doctor', component: DoctorPageComponent, canActivate: [authGuard], data: { roles: ["doctor"] } },
  { path: 'create-appointment', component: CreateAppointmentPageComponent, canActivate: [authGuard], data: { roles: ["doctor"] } },
  {
    path: 'patient', children: [
      {
        path: 'my-appointments',
        component: PatientAppointmentsPageComponent
      },
      {
        path: 'find-appointments',
        component: MakeAppointmentPageComponent
      }
    ], component: PatientPageComponent, canActivate: [authGuard], data: {
      roles: ["patient"],

    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
