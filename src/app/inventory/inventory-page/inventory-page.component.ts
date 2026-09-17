import { Component, OnInit } from '@angular/core';
import { TechnicianInventory} from '../../shared/domain/model/inventory.entity';
import { ComponentStock } from '../../shared/domain/model/component-stock.entity';
import { AddStockItemDto, TechnicianInventoryService, UpdateStockItemDto } from '../services/inventory.service'; // Ajusta la ruta
import { UpdateQuantityEvent } from '../inventory-list/inventory-list.component'; // Ajusta la ruta
// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InventoryAddItemFormComponent } from '../inventory-add-item-form/inventory-add-item-form.component';
import { InventoryFormComponent } from '../inventory-form/inventory-form.component';
import { InventoryListComponent } from '../inventory-list/inventory-list.component';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { AuthenticationService } from '../../iam/services/authentication.service';

@Component({
  selector: 'app-technician-inventory-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InventoryFormComponent,
    // Angular Material modules
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    InventoryListComponent
  ],
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.css']
})
export class TechnicianInventoryPageComponent implements OnInit {
  // En una app real, este ID vendría de una ruta (ActivatedRoute) o un servicio de sesión
  technicianId!: string;
  inventory: TechnicianInventory | null = null;
  isLoading = false;
  error: string | null = null;
  route: any;

  constructor(
    private inventoryService: TechnicianInventoryService,
    private authService: AuthenticationService          // ⬅️ inyección correcta
  ) {}

  ngOnInit(): void {
  this.authService.currentUserId
    .pipe(
      filter(id => id > 0),           // ⬅️ ignoramos el “0” inicial
      distinctUntilChanged()          // solo cuando realmente cambie
    )
    .subscribe(id => {
      this.technicianId = String(id);
      this.loadInventory();           // ahora sí, con token & ID correcto
    });
}

  loadInventory(): void {
    this.isLoading = true;
    this.error = null;
    this.inventoryService.getInventory(this.technicianId).subscribe({
      next: (data) => {
        console.log('Inventario recibido:', data);
        this.inventory = data;
      },
      error: (err) => {
        this.error = err.message;
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // --- Manejadores de eventos de los componentes hijos ---

  onAddItem(itemDto: AddStockItemDto): void {
    this.inventoryService.addStockItem(this.technicianId, itemDto).subscribe({
      next: () => {
        console.log('Ítem añadido con éxito.');
        this.loadInventory(); // Recargamos el inventario para ver los cambios
      },
      error: (err) => alert(`Error al añadir ítem: ${err.message}`)
    });
  }

  onUpdateQuantity(event: UpdateQuantityEvent): void {
    const itemToUpdate = this.inventory?.stockItems.find(i => i.componentId === event.componentId);
    if (!itemToUpdate) return;

    const updateDto: UpdateStockItemDto = {
      newQuantity: event.newQuantity,
      newAlertThreshold: itemToUpdate.alertThreshold // Mantenemos el umbral existente
    };

    this.inventoryService.updateStockItem(this.technicianId, event.componentId, updateDto).subscribe({
      next: () => {
        console.log('Cantidad actualizada.');
        this.loadInventory();
      },
      error: (err) => alert(`Error al actualizar cantidad: ${err.message}`)
    });
  }

  onRemoveItem(componentId: string): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este ítem?')) return;

    this.inventoryService.removeStockItem(this.technicianId, componentId).subscribe({
      next: () => {
        console.log('Ítem eliminado.');
        this.loadInventory();
      },
      error: (err) => alert(`Error al eliminar ítem: ${err.message}`)
    });
  }
}
