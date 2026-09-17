import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ComponentTypeService } from '../../../../inventory/services/component-type.service';

@Component({
  selector: 'app-component-type-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './component-type-form.component.html',
  styleUrls: ['./component-type-form.component.css']
})
export class ComponentTypeFormComponent {
  @Output() typeAdded = new EventEmitter<void>();

  typeForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private typeService: ComponentTypeService
  ) {
    this.typeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.typeForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    this.typeService.create(this.typeForm.value).subscribe({
      next: () => {
        this.typeForm.reset();
        this.typeAdded.emit();
      },
      error: (err) => {
        this.errorMessage = err.message || 'Ocurrió un error desconocido.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
