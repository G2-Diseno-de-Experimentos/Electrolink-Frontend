import { Component, OnInit } from '@angular/core';
import { Property } from '../../../../shared/domain/model/property.entity';
import { PropertyService } from '../../../services/property.service';
import { Observable } from 'rxjs';
import { PropertyDetailComponent } from "../property-detail/property-detail.component";
import { PropertyMapComponent } from "../property-map/property-map.component";
import { PropertyListComponent } from "../property-list/property-list.component";
import { MatDividerModule } from '@angular/material/divider';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PropertyCreateAndEditComponent } from '../property-create-and-edit/property-create-and-edit.component';
import { MatButtonModule } from '@angular/material/button'; // Importar si es necesario
import { MatIconModule } from '@angular/material/icon';
import {CurrentUserService} from '../../../../shared/services/current-user.service';

@Component({
  selector: 'app-property-page',
  standalone: true,
  templateUrl: './property-management-page.component.html',
  styleUrls: ['./property-management-page.component.css'],
  imports: [PropertyDetailComponent, PropertyMapComponent, PropertyListComponent,MatDividerModule, AsyncPipe,
    MatButtonModule,
    MatIconModule,]
})
export class PropertyManagementPageComponent implements OnInit {
  currentOwnerId!: string;
  properties$!: Observable<Property[]>;
  allProperties: Property[] = [];

  selectedProperty: Property | null = null;

  constructor(private propertyService: PropertyService,private dialog: MatDialog, private currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.currentOwnerId = this.currentUser.ownerId;
    this.loadProperties();
  }

  loadProperties(): void {
    this.properties$ = this.propertyService.getAll();
    this.properties$.subscribe(data => this.allProperties = data);
  }
  onPropertySelected(propertyId: string): void {
    this.selectedProperty = this.allProperties.find(p => p.id === propertyId) || null;
  }

  openCreateDialog(): void {
    const ownerId = this.currentUser.ownerId;
    const dialogRef = this.dialog.open(PropertyCreateAndEditComponent, {
      width: '600px',
      data : { ownerId}   // ← pasa el id aquí
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Propiedad creada. Actualizando lista...');
        this.loadProperties(); // ¡Recargamos la lista de propiedades!
        this.selectedProperty = null; // Deseleccionamos cualquier propiedad
      }
    });
  }
}
