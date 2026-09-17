// property-create.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { PropertyMapComponent } from '../property-map/property-map.component'; // Tu componente de mapa
import { PropertyService } from '../../../services/property.service';
import { GeocodingService, NominatimResponse } from '../../../../shared/services/geocoding.service';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-property-create-and-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PropertyMapComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule, // Necesario para mat-dialog-title, mat-dialog-content, mat-dialog-actions
    MatListModule,   // Necesario para mat-list, mat-list-item
    MatIconModule    // Necesario para mat-icon
  ],
  templateUrl: './property-create-and-edit.component.html',
  styleUrls: ['./property-create-and-edit.component.css']
})

export class PropertyCreateAndEditComponent implements OnInit {
  propertyForm: FormGroup;
  isLoading = false;
  searchResults: NominatimResponse[] = [];
  mapProperty: any[] | null = null;

  private dialogData = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private geocodingService = inject(GeocodingService);
  public dialogRef = inject(MatDialogRef<PropertyCreateAndEditComponent>);

  constructor() {
    this.propertyForm = this.fb.group({
      street     : ['', Validators.required],
      number     : ['', Validators.required],
      city       : ['', Validators.required],
      postalCode   : ['', Validators.required],
      country    : ['Perú', Validators.required],
      district   : ['', Validators.required],
      region     : ['', Validators.required],
      latitude   : [null,  Validators.required],
      longitude  : [null,  Validators.required],
      ownerId    : [{ value: this.dialogData.ownerId, disabled: true }]
    });
  }

  ngOnInit(): void {
    this.propertyForm.get('street')!.valueChanges.pipe(
      debounceTime(500),
      tap(() => this.isLoading = true),
      switchMap(address => this.geocodingService.search(address)),
      tap(() => this.isLoading = false)
    ).subscribe(results => {
      this.searchResults = results;
    });
  }

  selectAddress(result: NominatimResponse): void {
    const address = result.address;
    const street = address?.road || result.display_name.split(',')[0] || '';
    const district = address?.city || address?.suburb || address?.county || '';
    const region = address?.state || '';
    const number = address?.house_number || '';
    const city = address?.city || '';
    const postalCode = address?.postcode  || '';
    const country    = address?.country  || 'Perú';

    this.propertyForm.patchValue({
      street,
      number,
      city,
      postalCode,
      country,
      district,
      region,
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon)
    });

    this.updateMapPin(parseFloat(result.lat), parseFloat(result.lon));
    this.searchResults = [];
  }

  private updateMapPin(lat: number, lon: number): void {
    this.mapProperty = [{
      id: 'temp-id',
      address: { latitude: lat, longitude: lon }
    }];
  }

  onSubmit(): void {
    if (this.propertyForm.invalid) return;
    this.isLoading = true;

    const {
      ownerId, street,number, city, postalCode, country, region, district,
      latitude, longitude
    } = this.propertyForm.getRawValue();

    const dto = {
      ownerId,
      address : { street, number, city, postalCode, country, latitude, longitude },
      region  ,
      district ,
    };

    this.propertyService.create(dto).subscribe({
      next : () => { this.isLoading = false; this.dialogRef.close(true); },
      error: err => { this.isLoading = false; console.error(err); }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
