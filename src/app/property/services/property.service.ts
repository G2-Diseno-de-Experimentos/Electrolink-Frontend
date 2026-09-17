import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service'; // Ajusta la ruta a tu BaseService
import { Property } from '../../shared/domain/model/property.entity'; // Ajusta la ruta a tu modelo

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends BaseService<Property> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/properties'; // ¡Verifica y ajusta esta ruta!
  }

}
