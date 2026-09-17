import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ComponentType } from '../../../domain/model/component-type.entity';

@Component({
  selector: 'app-component-type-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './component-type-list.component.html',
  styleUrls: ['./component-type-list.component.css']
})
export class ComponentTypeListComponent {
  @Input() types: ComponentType[] = [];
  @Input() isLoading: boolean = false;
  @Input() error: string | null = null;
}
