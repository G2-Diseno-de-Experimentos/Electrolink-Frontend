import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { BaseFormComponent } from '../../../../shared/presentation/components/base-form.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProfileService } from '../../../services/profile.service';
import { SignUpRequest } from '../../../domain/model/sign-up.request';
import { ProfileRequest } from '../../../domain/model/profile.request';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatError } from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatError,
    MatSelect,
    MatOption,
    NgIf,
    NgFor,
    MatIcon,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  roles = ['HOMEOWNER', 'TECHNICIAN'];

  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      role: ['HOMEOWNER', Validators.required],
      additionalInfoOrCertification: ['']
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { username, password, firstName, lastName, email, street, role, additionalInfoOrCertification } = this.form.value;

    const signUpRequest = new SignUpRequest(username, password);
    const profileRequest = new ProfileRequest(
      firstName,
      lastName,
      email,
      street,
      role,
      additionalInfoOrCertification
    );

    this.authenticationService.signUp(signUpRequest).subscribe({
      next: () => {
        this.profileService.createProfile(profileRequest).subscribe({
          next: () => {
            alert('Registro exitoso. Ahora inicia sesión.');
            this.router.navigate(['/sign-in']).then();
          },
          error: () => alert('Error al crear perfil')
        });
      },
      error: () => alert('Error al crear usuario')
    });

    this.submitted = true;
  }

  isTechnician(): boolean {
    return this.form?.value?.role === 'TECHNICIAN';
  }

  isHomeowner(): boolean {
    return this.form?.value?.role === 'HOMEOWNER';
  }
}
