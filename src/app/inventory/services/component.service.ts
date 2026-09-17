import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseService } from '../../shared/services/base.service';
import { Component } from '../../shared/domain/model/component.entity';

@Injectable({
  providedIn: 'root'
})
export class ComponentService extends BaseService<Component> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/components';
  }

  /**
   * Obtiene todos los componentes del backend.
   */
  getComponents(): Observable<Component[]> {
    return this.http.get<Component[]>(this.resourcePath(), this.getHttpOptions())
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * Obtiene un componente por su ID.
   */
  getById(id: string): Observable<Component> {
    return this.http.get<Component>(`${this.resourcePath()}/${id}`, this.getHttpOptions())
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * Busca componentes por el ID de su tipo.
   */
  getByTypeId(typeId: number): Observable<Component[]> {
    const params = new HttpParams().set('typeId', typeId.toString());
    return this.http.get<Component[]>(this.resourcePath(), {
      ...this.getHttpOptions(),
      params
    }).pipe(retry(2), catchError(this.handleError));
  }

  /**
   * Busca componentes por una lista de IDs.
   */
  getByIds(ids: string[]): Observable<Component[]> {
    const params = new HttpParams().set('ids', ids.join(','));
    return this.http.get<Component[]>(this.resourcePath(), {
      ...this.getHttpOptions(),
      params
    }).pipe(retry(2), catchError(this.handleError));
  }

  /**
   * Desactiva un componente (DELETE).
   */
  deactivate(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.resourcePath()}/${id}`, this.getHttpOptions())
      .pipe(retry(2), catchError(this.handleError));
  }
}
