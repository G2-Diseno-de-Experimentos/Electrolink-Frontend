import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome-dashboard.component.html',
  imports: [
    MatIcon
  ],
  styleUrls: ['./welcome-dashboard.component.css']

})
export class WelcomeComponent {

  constructor(private router: Router) {}

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
