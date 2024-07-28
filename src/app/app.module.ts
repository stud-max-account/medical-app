import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorPageComponent } from './pages/doctor-page/doctor-page.component';
import { PatientAppointmentsPageComponent } from './pages/patient/appointments/patient-appointments-page.component';
import { CreateAppointmentPageComponent } from './pages/create-appointment/create-appointment.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrainTumorDetectionPageComponent } from './pages/brain-tumor-detection/brain-tumor-detection-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthPageComponent } from './pages/auth/auth-page.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { MainPageComponent } from './pages/main/main-page.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,

    HeaderComponent,
    MainPageComponent,
    AuthPageComponent,
    DoctorPageComponent, // check later

    PatientAppointmentsPageComponent, // check later
    CreateAppointmentPageComponent, // check later
    BrainTumorDetectionPageComponent
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()),



  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  provideAnimations(),
  provideToastr(),
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
