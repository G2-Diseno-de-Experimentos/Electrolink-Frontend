import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportPhoto } from '../model/report-photo';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportPhotoService {
  private readonly baseUrl = `${environment.serverBasePath}${environment.photoBasePath}`;

  constructor(private http: HttpClient) {}

  create(photo: Partial<ReportPhoto>): Observable<string> {
    return this.http.post(this.baseUrl, photo, { responseType: 'text' });
  }
}
