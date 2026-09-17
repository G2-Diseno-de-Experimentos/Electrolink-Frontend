import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../../../../inventory/services/component.service'; // Ajusta la ruta
import { ComponentTypeService } from '../../../../inventory/services/component-type.service'; // Ajusta la ruta
import { ComponentType } from '../../../domain/model/component-type.entity'; // Ajusta la ruta
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-component-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.css']
})
export class ComponentFormComponent implements OnInit {
  componentForm: FormGroup;
  componentTypes: ComponentType[] = [];
  isLoading = false;
  isLoadingTypes = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService, // Inyectamos el servicio de Componentes
    private typeService: ComponentTypeService   // y el de Tipos para el dropdown
  ) {
    this.componentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isActive: [true, Validators.required],
      componentTypeId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadComponentTypes();
  }

  loadComponentTypes(): void {
  this.isLoadingTypes = true;
  this.typeService.getAll().subscribe({
    next: (data) => {
      console.log('Tipos recibidos del backend:'); // 👈 verifica esto
      this.componentTypes = data;
    },
    error: (err) => {
      this.errorMessage = 'No se pudieron cargar los tipos de componente.';
      console.error(err);
    },
    complete: () => {
      this.isLoadingTypes = false;
    }
  });
}

  onSubmit(): void {
    if (this.componentForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Llamamos al create del ComponentService
    this.componentService.create(this.componentForm.value).subscribe({
      next: (createdComponent) => {
        alert(`Componente "${createdComponent.name}" creado con éxito!`);
        this.componentForm.reset({
          name: '',
          description: '',
          isActive: true,
          componentTypeId: null
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
