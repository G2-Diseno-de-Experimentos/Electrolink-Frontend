import { Component, EventEmitter, Output, OnInit } from '@angular/core'; // <-- 'OnInit' fue añadido
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { AddStockItemDto } from '../services/inventory.service';
// <-- FIX 1: Renombramos tu interfaz 'Component' a 'ComponentModel' para evitar conflictos.
import { Component as ComponentModel } from '../../shared/domain/model/component.entity';
import { ComponentService } from '../services/component.service';

@Component({
  selector: 'app-technician-inventory-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent implements OnInit { // <-- FIX: Implementa OnInit
  @Output() itemAdded = new EventEmitter<AddStockItemDto>();

  // <-- FIX 1: Usamos el nuevo nombre 'ComponentModel'
  allComponents: ComponentModel[] = [];
  inventoryForm: FormGroup;
  filteredComponents!: Observable<ComponentModel[]>;

  constructor(
    private fb: FormBuilder,
    private componentService: ComponentService
  ) {
    this.inventoryForm = this.fb.group({
      componentId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      alertThreshold: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.componentService.getComponents().subscribe(components => {
      this.allComponents = components;
    });

    this.filteredComponents = this.inventoryForm.get('componentId')!.valueChanges.pipe(
      startWith(''),
      // <-- FIX 1: Usamos 'ComponentModel' en la firma
      map(value => (typeof value === 'string' ? value : value?.name)),
      map(name => (name ? this._filter(name) : this.allComponents.slice()))
    );
  }

  // <-- FIX 2: Añadido el método _filter que faltaba.
  private _filter(name: string): ComponentModel[] {
    const filterValue = name.toLowerCase();
    return this.allComponents.filter(component => component.name.toLowerCase().includes(filterValue));
  }

  // <-- FIX 2: Añadido el método displayFn, necesario para el [displayWith] en el HTML.
  displayFn(component: ComponentModel): string {
    return component && component.name ? component.name : '';
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      this.inventoryForm.markAllAsTouched();
      return;
    }

    // <-- FIX 3: Corregido el payload para emitir solo el ID del componente.
    const formValue = this.inventoryForm.value;
    const payload: AddStockItemDto = {
      // El form control guarda el objeto completo, extraemos solo el 'id'.
      componentId: formValue.componentId.id,
      quantity: formValue.quantity,
      alertThreshold: formValue.alertThreshold
    };

    this.itemAdded.emit(payload);

    this.inventoryForm.reset({
      componentId: '',
      quantity: 0,
      alertThreshold: 0
    });
  }
}
