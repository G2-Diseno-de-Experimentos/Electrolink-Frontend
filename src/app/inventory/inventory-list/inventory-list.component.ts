import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentStock } from '../../shared/domain/model/component-stock.entity';

export interface UpdateQuantityEvent {
  componentId: string;
  newQuantity: number;
}

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent {
  @Input() inventoryItems: ComponentStock[] | undefined = [];
  @Input() isLoading: boolean = false;

  @Output() updateQuantity = new EventEmitter<UpdateQuantityEvent>();
  @Output() removeItem = new EventEmitter<string>();

  displayedColumns: string[] = ['component', 'quantity', 'alertThreshold', 'lastUpdated', 'actions'];

  onUpdateQuantity(item: ComponentStock, newQuantity: number): void {
    if (newQuantity < 0) return;
    this.updateQuantity.emit({ componentId: item.id, newQuantity });
  }

  onRemoveItem(componentId: string): void {
    this.removeItem.emit(componentId);
  }
}
