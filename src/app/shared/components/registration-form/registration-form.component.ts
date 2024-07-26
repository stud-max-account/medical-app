import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { RadioButtonModule } from "primeng/radiobutton";
import { AuthService } from "../../../services/auth.service";
import { PatientRegistrationDto } from "../../../dto/patient-registration-dto";
import { ToastrService } from "ngx-toastr";

interface IRegistrationForm {
   name: FormControl<string>,
   surname: FormControl<string>,
   email: FormControl<string>,
   dateBirth: FormControl<string>,
   gender: FormControl<string | null>,
   bloodGroup: FormControl<string>,
   emergencyContactName: FormControl<string>,
   emergencyContactPhone: FormControl<string>,
   password: FormControl<string>,
   repeatPassword: FormControl<string>,
}

@Component({
   standalone: true,
   selector: "registration-form",
   templateUrl: "./registration-form.component.html",
   styleUrl: "./registration-form.component.css",
   imports: [ReactiveFormsModule, RadioButtonModule, CalendarModule]
})
export class RegistrationFormComponent {

   registrationForm = new FormGroup<IRegistrationForm>({

      name: new FormControl('', { nonNullable: true }),
      surname: new FormControl<string>('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      dateBirth: new FormControl('', { nonNullable: true }),
      gender: new FormControl(null, { nonNullable: true }),
      bloodGroup: new FormControl('', { nonNullable: true }),
      emergencyContactName: new FormControl('', { nonNullable: true }),
      emergencyContactPhone: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
      repeatPassword: new FormControl('', { nonNullable: true }),
   });

   constructor(private authService: AuthService, private toastr: ToastrService) {

   }


   onSubmitHandler() {

      if (this.registrationForm.invalid) {
         console.log("invalid");
         return;
      }
      const { repeatPassword, ...formValuesWithoutRepeatPassword } = this.registrationForm.value;

      this.authService.registrationPatient(formValuesWithoutRepeatPassword as PatientRegistrationDto)

         .subscribe({
            next: (data: any) => {
               localStorage.setItem("token", data.accessToken);
               this.authService.currentUserSignal.set(data.user);
               this.registrationForm.reset();
            },
            error: err => {
               const errMsg: string = err.error?.message ?? "Something incorrect";
               this.toastr.error(errMsg, 'Error');
            }
         }

         );
   }
}
