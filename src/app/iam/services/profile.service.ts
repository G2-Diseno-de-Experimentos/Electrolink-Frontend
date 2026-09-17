import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { ProfileRequest } from "../domain/model/profile.request";
import { ProfileResponse } from "../domain/model/profile.response";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private basePath: string = `${environment.serverBasePath}${environment.profilesEndpoint}`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  /**
   * Create a new user profile.
   * @param request The profile creation request.
   */
  createProfile(request: ProfileRequest): Observable<ProfileResponse> {
    return this.http.post<ProfileResponse>(this.basePath, request, this.httpOptions);
  }
}
