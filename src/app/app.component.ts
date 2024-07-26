import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent implements OnInit {
  title = 'medical-management';

  authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.getCurrentAuthorizedUser().subscribe((user) => {

      this.authService.currentUserSignal.set(user);
    });


  }
}
