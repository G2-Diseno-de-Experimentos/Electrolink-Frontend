import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../../../../shared/domain/model/property.entity';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule],
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  @Input() properties: Property[] | null = null;
  @Input() selectedPropertyId: string | null = null;
  @Output() propertySelected = new EventEmitter<string>();
}
