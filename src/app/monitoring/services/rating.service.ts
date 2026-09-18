import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../model/rating';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private readonly baseUrl = `${environment.serverBasePath}${environment.ratingsBasePath}`;
  private readonly techUrl = `${environment.serverBasePath}${environment.techniciansEndpoint}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.baseUrl);
  }

  getById(ratingId: string): Observable<Rating> {
    return this.http.get<Rating>(`${this.baseUrl}/${ratingId}`);
  }

  getByTechnicianId(technicianId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.techUrl}/${technicianId}${environment.ratingsBasePath}`);
  }

  getByRequestId(requestId: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}/requests/${requestId}`);
  }

  create(rating: Partial<Rating>): Observable<string> {
    return this.http.post(this.baseUrl, rating, { responseType: 'text' });
  }

  update(ratingId: string, rating: Partial<Rating>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${ratingId}`, rating);
  }

  delete(ratingId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${ratingId}`);
  }
}
