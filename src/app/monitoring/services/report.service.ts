import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../model/report';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly baseUrl = `${environment.serverBasePath}${environment.reportsBasePath}`;
  private readonly techUrl = `${environment.serverBasePath}${environment.techniciansEndpoint}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl);
  }

  getById(reportId: string): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}/${reportId}`);
  }

  getByRequestId(requestId: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/requests/${requestId}`);
  }

  getByTechnicianId(technicianId: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.techUrl}/${technicianId}${environment.reportsBasePath}`);
  }

  create(report: Partial<Report>): Observable<string> {
    return this.http.post(this.baseUrl, report, { responseType: 'text' });
  }

  delete(reportId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${reportId}`);
  }
}
