import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-authentication-section',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  templateUrl: './authentication-section.component.html',
  styleUrl: './authentication-section.component.css'
})
export class AuthenticationSectionComponent {

  currentUserName: string = '';
  isSignedIn: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUsername.subscribe(
      username => this.currentUserName = username
    );
    this.authenticationService.isSignedIn.subscribe(
      signedIn => this.isSignedIn = signedIn
    );
  }

  /**
   * Navega al formulario de login.
   */
  onSignIn() {
    this.router.navigate(['/sign-in']).then();
  }

  /**
   * Navega al formulario de registro.
   */
  onSignUp() {
    this.router.navigate(['/sign-up']).then();
  }

  /**
   * Cierra sesión y vuelve al home.
   */
  onSignOut() {
    this.authenticationService.signOut();
    this.router.navigate(['/']).then();
  }
}
