import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TechnicianInventory } from '../../shared/domain/model/inventory.entity';
import { AddStockItemDto, TechnicianInventoryService, UpdateStockItemDto } from '../services/inventory.service';
import { InventoryFormComponent } from '../inventory-form/inventory-form.component';
import { InventoryListComponent } from '../inventory-list/inventory-list.component';
import { AuthenticationService } from '../../iam/services/authentication.service'; // Asegúrate de ajustar la ruta de importación

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    InventoryFormComponent,
    InventoryListComponent
  ]
})
export class InventoryPageComponent implements OnInit {
  inventory: TechnicianInventory | null = null;
  technicianId: string = '';
  notFoundMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private inventoryService: TechnicianInventoryService,
    private authService: AuthenticationService, // Inyección del servicio
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Obtiene el ID del usuario actualmente autenticado
    const currentUserId = this.authService.getSignedInUserId();

    // 2. Prioridad al usuario logueado; fallback al parámetro de la URL si no hay sesión
    if (currentUserId > 0) {
      this.technicianId = currentUserId.toString();
    } else {
      this.technicianId = this.route.snapshot.paramMap.get('id') || '';
    }

    if (this.technicianId) {
      this.loadInventory(this.technicianId);
    } else {
      this.notFoundMessage = 'No se ha detectado ninguna sesión activa de técnico';
    }
  }

  loadInventory(technicianId: string): void {
    this.isLoading = true;
    this.inventoryService.getInventory(technicianId).subscribe({
      next: (data) => {
        this.isLoading = false;
        if (!data) {
          this.notFoundMessage = 'No se encontró ningún inventario asociado a este técnico';
          this.inventory = null;
        } else {
          this.inventory = data;
          this.notFoundMessage = '';
        }
      },
      error: () => {
        this.isLoading = false;
        this.notFoundMessage = 'Error al cargar el inventario del técnico';
      }
    });
  }

  onAddItem(event: AddStockItemDto): void {
    if (!this.technicianId) return;
    this.inventoryService.addStockItem(this.technicianId, event).subscribe(() => {
      this.loadInventory(this.technicianId);
    });
  }

  onUpdateQuantity(event: any): void {
    if (!this.technicianId || !event) return;

    const dto: UpdateStockItemDto = {
      newQuantity: event.newQuantity ?? event.quantity ?? 0,
      newAlertThreshold: event.newAlertThreshold ?? event.alertThreshold ?? 0
    };

    const componentId = event.componentId || event.id;

    this.inventoryService.updateStockItem(this.technicianId, componentId, dto).subscribe(() => {
      this.loadInventory(this.technicianId);
    });
  }

  onRemoveItem(componentId: string): void {
    if (!this.technicianId) return;
    this.inventoryService.removeStockItem(this.technicianId, componentId).subscribe(() => {
      this.loadInventory(this.technicianId);
    });
  }
}
