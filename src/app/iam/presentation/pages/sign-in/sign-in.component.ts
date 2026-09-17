import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { BaseFormComponent } from '../../../../shared/presentation/components/base-form.component';
import { SignInRequest } from '../../../domain/model/sign-in.request';
import { SignInResponse } from '../../../domain/model/sign-in.response';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatError,
    NgIf,
    MatIcon,
    MatIconButton,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends BaseFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { username, password } = this.form.getRawValue();
    const signInRequest = new SignInRequest(username, password);

    this.authenticationService.signIn(signInRequest).subscribe({
      next: (response: SignInResponse) => {
        console.log('Login response:', response);
        this.authenticationService.handleSignInSuccess(response);
        this.router.navigate(['/dashboard/homeowner']);
      },
      error: (err: any) => {
        console.error('Login failed', err);
        alert('Invalid credentials');
        this.form.reset();
      }
    });

    this.submitted = true;
  }
}
