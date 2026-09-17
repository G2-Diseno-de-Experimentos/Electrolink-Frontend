import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../../shared/services/base.service';
import { ComponentType } from '../../shared/domain/model/component-type.entity';

@Injectable({
  providedIn: 'root'
})
export class ComponentTypeService extends BaseService<ComponentType> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/component-types';
  }

  getById(typeId: number): Observable<ComponentType> {
    return this.http.get<ComponentType>(
      `${this.resourcePath()}/${typeId}`,
      this.getHttpOptions()
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
