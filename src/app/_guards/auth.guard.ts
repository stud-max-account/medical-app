import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
   const accountService = inject(AuthService);

   const currentUserSignal = accountService.currentUserSignal()

   if (!currentUserSignal) {
      return false;
   }

   if (!route.data.roles) {
      return true;
   }

   if (route.data.roles.includes(currentUserSignal.role)) {
      return true;
   }
   return false;

};
