import { Component, computed, inject } from "@angular/core";
import { NgIf } from "@angular/common";
import { AvatarModule } from "primeng/avatar";
import {Router, RouterLink} from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
   standalone: true,
   selector: 'app-header',
   templateUrl: "./header.component.html",
   styles: `
   .header{
   border-bottom:1px solid silver;

   }
   `,
   imports: [NgIf, RouterLink, AvatarModule]
})
export class HeaderComponent {

   authService = inject(AuthService);

   currentUser = computed(this.authService.currentUserSignal)

  constructor(private router:Router) {
  }


  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl("/");
  }

}
