import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AddStockItemDto } from '../services/inventory.service';

@Component({
  selector: 'app-inventory-add-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './inventory-add-item-form.component.html',
  styleUrls: ['./inventory-add-item-form.component.css']
})

export class InventoryAddItemFormComponent {
  @Output() addItem = new EventEmitter<AddStockItemDto>();

  addItemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addItemForm = this.fb.group({
      componentId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      alertThreshold: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.addItemForm.invalid) {
      return;
    }
    this.addItem.emit(this.addItemForm.value);
    this.addItemForm.reset({ quantity: 0, alertThreshold: 0 });
  }
}
