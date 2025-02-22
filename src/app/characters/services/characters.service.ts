import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs'
import { Characters } from '../interfaces/characters.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private http = inject(HttpClient)
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  getItems(page: number): Observable<Characters> {
    return this.http.get<Characters>(`${this.baseUrl}/?page=${page}`)
    .pipe(
      catchError(error => {
        return throwError(() => new Error('No se encontro la información solicitada'))
      })
    );
  }

}
