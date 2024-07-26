
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { LoginFormComponent } from "../../shared/components/login-form/login-form.component";
import { RegistrationFormComponent } from "../../shared/components/registration-form/registration-form.component";
import { NgIf } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { toObservable } from "@angular/core/rxjs-interop";
import { Subscription } from "rxjs";

@Component({

   selector: "auth-page",
   templateUrl: "./auth-page.component.html",
   styleUrl: "./auth-page.component.css",
   standalone: true,
   imports: [NgIf, LoginFormComponent, RegistrationFormComponent]
})
export class AuthPageComponent implements OnInit, OnDestroy {

   private authService = inject(AuthService);

   private router = inject(Router);

   isActiveLogin: boolean = true;


   currentUser$ = toObservable(this.authService.currentUserSignal)

   currentUserSub: Subscription;


   ngOnInit(): void {
      this.currentUserSub = this.currentUser$.subscribe(userData => {
         if (userData) {
            this.router.navigateByUrl("/");
         }
      })



   }


   ngOnDestroy(): void {
      this.currentUserSub.unsubscribe();
   }


}
