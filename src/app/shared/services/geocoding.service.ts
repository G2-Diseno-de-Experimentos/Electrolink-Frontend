import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
  address: {
    postcode: string;
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    county?: string;
    country?: string;
    country_code?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  /**
   * Busca una dirección y devuelve las coordenadas.
   * @param address La dirección a buscar.
   * @returns Un Observable con un array de posibles resultados.
   */
  search(address: string): Observable<NominatimResponse[]> {
    if (!address || address.trim() === '') {
      return of([]);
    }

    const params = {
      q: address,
      format: 'json',
      countrycodes: 'pe', // Limita la búsqueda a Perú para mayor precisión
      limit: '5', // Limita a 5 resultados
      addressdetails: '1'
    };

    return this.http.get<NominatimResponse[]>(this.nominatimUrl, { params }).pipe(
      catchError(err => {
        console.error('Error en el servicio de Geocodificación:', err);
        return of([]);
      })
    );
  }
}
