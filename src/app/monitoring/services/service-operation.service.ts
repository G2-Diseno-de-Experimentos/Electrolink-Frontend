import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceOperation } from '../model/service-operation';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceOperationService {
  private readonly baseUrl = `${environment.serverBasePath}${environment.serviceOperationsBasePath}`;
  private readonly techUrl = `${environment.serverBasePath}${environment.techniciansEndpoint}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceOperation[]> {
    return this.http.get<ServiceOperation[]>(this.baseUrl);
  }

  getById(id: string): Observable<ServiceOperation> {
    return this.http.get<ServiceOperation>(`${this.baseUrl}/${id}`);
  }

  getByTechnicianId(technicianId: string): Observable<ServiceOperation[]> {
    return this.http.get<ServiceOperation[]>(`${this.techUrl}/${technicianId}${environment.serviceOperationsBasePath}`);
  }

  create(operation: Partial<ServiceOperation>): Observable<string> {
    return this.http.post(this.baseUrl, operation, { responseType: 'text' });
  }

  updateStatus(requestId: string, newStatus: string): Observable<void> {
    const body = { requestId, newStatus };
    return this.http.put<void>(`${this.baseUrl}/status`, body);
  }
}
