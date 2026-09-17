import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component as ElectricalComponent } from '../../../domain/model/component.entity';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-component-list',
  standalone: true,
  imports: [
     CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})

export class ComponentListComponent {
  @Input() components: ElectricalComponent[] = [];
  @Input() isLoading: boolean = false;
  @Input() error: string | null = null;

  displayedColumns = ['name', 'description', 'isActive', 'actions'];

  onEdit(component: ElectricalComponent): void {
    console.log('Editar componente:', component);
    // Lógica futura aquí
  }

  onDelete(component: ElectricalComponent): void {
    console.log('Eliminar componente:', component);
    // Lógica futura aquí
  }
}
