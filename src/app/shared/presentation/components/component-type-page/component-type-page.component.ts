import { Component, OnInit } from '@angular/core';
import { ComponentTypeService } from '../../../../inventory/services/component-type.service';
import { ComponentType } from '../../../domain/model/component-type.entity';
import { ComponentTypeFormComponent } from '../component-type-form/component-type-form.component'; // Ajusta la ruta real
import { ComponentTypeListComponent } from '../component-type-list/component-type-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-type-management-page',
  standalone: true,
  imports: [
    CommonModule,
    ComponentTypeFormComponent,
    ComponentTypeListComponent
  ],
  templateUrl: './component-type-page.component.html',
  styleUrls: ['./component-type-page.component.css']
})
export class TypeManagementPageComponent implements OnInit {
  types: ComponentType[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private typeService: ComponentTypeService) {}

  ngOnInit(): void {
    this.loadTypes();
  }

  loadTypes(): void {
    this.isLoading = true;
    this.error = null;
    this.typeService.getAll().subscribe({
      next: (data) => this.types = data,
      error: (err) => this.error = err.message,
      complete: () => this.isLoading = false
    });
  }

  onTypeAdded(): void {
    console.log('Refrescando la lista de tipos...');
    this.loadTypes();
  }
}
