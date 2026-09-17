import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RequestService } from '../../service/request.service';
import { RequestEntity } from '../../model/request.entity';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { PropertyService } from '../../../property/services/property.service';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent {
  private requestService = inject(RequestService);

  constructor(
  private authService: AuthenticationService,
  private propertyService: PropertyService,
  private serviceService: ServiceService
  ) {}

  request: RequestEntity = new RequestEntity();
  photo = { photoId: '', url: '' };
  message: string = '';
  properties: any[] = [];
  services: any[] = [];

  ngOnInit(): void {
    const userId = this.authService.getSignedInUserId();
    this.request.clientId = userId.toString();
    this.request.technicianId = userId.toString();

    this.propertyService.getAll().subscribe({
      next: (data) => this.properties = data,
      error: (err) => console.error('Error loading properties', err)
    });

    this.serviceService.getAll().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error('Error loading services', err)
    });
  }
  async onSubmit() {
    this.message = '';

    if (!this.request.clientId || !this.request.technicianId || !this.request.propertyId || !this.request.serviceId) {
      this.message = 'All fields are required.';
      return;
    }

    try {
      // ⚠️ Ya no asignamos status ni requestedAt
      this.request.photos = [this.photo];

      await firstValueFrom(this.requestService.create(this.request));
      this.message = 'Request created successfully.';
      this.request = new RequestEntity();
      this.photo = { photoId: '', url: '' };
    } catch (error) {
      console.error('Error creating request:', error);
      this.message = 'Error occurred while creating request.';
    }
  }

}
