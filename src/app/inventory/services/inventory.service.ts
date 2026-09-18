import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TechnicianInventory, TechnicianInventoryData } from '../../shared/domain/model/inventory.entity';

export interface AddStockItemDto {
  componentId: string;
  quantity: number;
  alertThreshold: number;
}

export interface UpdateStockItemDto {
  newQuantity: number;
  newAlertThreshold: number;
}

@Injectable({
  providedIn: 'root'
})
export class TechnicianInventoryService {
  private basePath = `${environment.serverBasePath}/technician-inventories`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Error de backend (${error.status}):`, error.error);
    return throwError(() => new Error('Error al conectar con el servidor.'));
  }

  getInventory(technicianId: string): Observable<TechnicianInventory | null> {
    if (!technicianId) {
      return of(null);
    }

    return this.http.get<TechnicianInventoryData>(`${this.basePath}/technician/${technicianId}`, this.httpOptions)
      .pipe(
        map(data => data ? new TechnicianInventory(data) : null),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return of(null); // Retorna un Observable nulo si no se encuentra
          }
          return this.handleError(error);
        })
      );
  }

  createInventory(technicianId: string): Observable<void> {
    return this.http.post<void>(`${this.basePath}/${technicianId}/inventory`, {}, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  addStockItem(technicianId: string, stockData: AddStockItemDto): Observable<void> {
    const url = `${this.basePath}/technician/${technicianId}/stocks`;
    return this.http.post<void>(url, JSON.stringify(stockData), this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  updateStockItem(technicianId: string, componentId: string, updateData: UpdateStockItemDto): Observable<TechnicianInventory | null> {
    const url = `${this.basePath}/${technicianId}/inventory/stock-items/${componentId}`;
    return this.http.put<TechnicianInventoryData>(url, JSON.stringify(updateData), this.httpOptions)
      .pipe(
        map(data => data ? new TechnicianInventory(data) : null),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return of(null);
          }
          return this.handleError(error);
        })
      );
  }

  removeStockItem(technicianId: string, componentId: string): Observable<void> {
    const url = `${this.basePath}/${technicianId}/inventory/stock-items/${componentId}`;
    return this.http.delete<void>(url, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }
}
