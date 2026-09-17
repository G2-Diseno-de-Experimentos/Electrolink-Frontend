import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry,map  } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
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
  // La ruta base para este servicio es diferente
  private basePath = `${environment.serverBasePath}/technician-inventories`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  // Se extrae el manejador de errores para reutilizarlo
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  /**
   * Obtiene el inventario completo de un técnico.
   * @param technicianId - El ID del técnico.
   */
  getInventory(technicianId: string): Observable<TechnicianInventory> {
    return this.http.get<TechnicianInventoryData>(`${this.basePath}/technician/${technicianId}`, this.httpOptions)
      .pipe(
        retry(2),
        map(data => new TechnicianInventory(data)), // Transforma el JSON en una instancia de la clase
        catchError(this.handleError)
      );
  }

  /**
   * Crea un inventario vacío para un técnico.
   * @param technicianId - El ID del técnico.
   */
  createInventory(technicianId: string): Observable<void> {
    return this.http.post<void>(`${this.basePath}/${technicianId}/inventory`, {}, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Añade un nuevo item al stock del inventario.
   * @param technicianId - El ID del técnico.
   * @param stockData - Los datos del nuevo item.
   */
  addStockItem(technicianId: string, stockData: AddStockItemDto): Observable<void> {
    const url = `${this.basePath}/technician/${technicianId}/stocks`;
    return this.http.post<void>(url, JSON.stringify(stockData), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza un item de stock existente.
   * @param technicianId - El ID del técnico.
   * @param componentId - El ID del componente a actualizar.
   * @param updateData - Los nuevos datos para el item.
   */
  updateStockItem(technicianId: string, componentId: string, updateData: UpdateStockItemDto): Observable<TechnicianInventory> {
    const url = `${this.basePath}/${technicianId}/inventory/stock-items/${componentId}`;
    return this.http.put<TechnicianInventoryData>(url, JSON.stringify(updateData), this.httpOptions)
      .pipe(
        retry(2),
        map(data => new TechnicianInventory(data)),
        catchError(this.handleError)
      );
  }

  /**
   * Elimina un item de stock del inventario.
   * @param technicianId - El ID del técnico.
   * @param componentId - El ID del componente a eliminar.
   */
  removeStockItem(technicianId: string, componentId: string): Observable<void> {
    const url = `${this.basePath}/${technicianId}/inventory/stock-items/${componentId}`;
    return this.http.delete<void>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
