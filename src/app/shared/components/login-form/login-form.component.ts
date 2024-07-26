import { Component } from "@angular/core";
import { CheckboxModule } from "primeng/checkbox";
import { AuthService } from "../../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";


interface LoginForm {
   email: FormControl<string | null>;
   password: FormControl<string | null>;
}

@Component({
   standalone: true,
   selector: "login-form",
   templateUrl: "./login-form.component.html",
   styleUrl: "./login-form.component.css",

   imports: [ReactiveFormsModule, CheckboxModule],

})
export class LoginFormComponent {

   loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', [Validators.required]),
      password: new FormControl(''),
   });

   constructor(private authService: AuthService, private toastr: ToastrService) { }

   onSubmitHandler() {
      const { email, password } = this.loginForm.value;

      if (email && password) {
         this.authService.login(email, password).subscribe({
            next: (data: any) => {
               localStorage.setItem("token", data.accessToken);
               this.authService.currentUserSignal.set(data.user);

            },
            error: err => {
               const errMsg: string = err.error?.message ?? "Something incorrect";
               this.toastr.error(errMsg, 'Error');
            }
         })
      }


   }

}
