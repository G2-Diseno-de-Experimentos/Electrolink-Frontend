import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 *  ⚠️  Versión mínima para hoy:
 *      - Devuelve siempre el mismo ownerId de pruebas.
 *      - Puedes cambiarlo con set() en tiempo de ejecución si hace falta.
 *  🗓  Mañana, sustituye 'TEST-ID' por el valor del JWT
 *      o por la llamada a /profiles/me.
 */
@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private readonly ownerId$ = new BehaviorSubject<string>('1');

  get ownerId(): string {
    return this.ownerId$.value;
  }

  set(ownerId: string) {
    this.ownerId$.next(ownerId);
  }
}
