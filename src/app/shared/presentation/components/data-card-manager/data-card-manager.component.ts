import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-data-card-manager',
  imports: [MatCardModule,MatIcon,NgTemplateOutlet],
  templateUrl: './data-card-manager.component.html',
  styleUrl: './data-card-manager.component.css'
})
export class DataCardManagerComponent {
  @Input() items: any[]= [];
  @Input() title: { singular: string, plural: string } = { singular: '', plural: '' };
  @Input() itemTemplate!: TemplateRef<any>;


  @Output() newItemRequested = new EventEmitter<void>();
  @Output() editItemRequested = new EventEmitter<any>();
  @Output() deleteItemRequested = new EventEmitter<any>();

  onNew() {
    this.newItemRequested.emit();
  }

  onEdit(item: any) {
    this.editItemRequested.emit(item);
  }

  onDelete(item: any) {
    this.deleteItemRequested.emit(item);
  }
}
