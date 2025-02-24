import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs'
import { Characters, Result } from '../interfaces/characters.interfaces';
import { Location } from '../interfaces/location.interfaces';
import { Episode } from '../interfaces/episode.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private http = inject(HttpClient)
  private baseUrl = 'https://rickandmortyapi.com/api';

  getListCharacters(page: number, searchName: string, searchSpecies: string): Observable<Characters> {
    return this.http.get<Characters>(
      `${this.baseUrl}/character/?page=${page}&name=${searchName}&species=${searchSpecies}`
    )
    .pipe(
      catchError(error => {
        return throwError(() => new Error('No se encontro la información solicitada'))
      })
    );
  }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/location/${id}`)
    .pipe(
      catchError(error => {
        return throwError(() => new Error('No se encontro la información solicitada'))
      })
    );
  }

  getEpisode(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.baseUrl}/episode/${id}`)
    .pipe(
      catchError(error => {
        return throwError(() => new Error('No se encontro la información solicitada'))
      })
    );
  }

  getCharacter(id: number): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}/character/${id}`)
    .pipe(
      catchError(error => {
        return throwError(() => new Error('No se encontro la información solicitada'))
      })
    );
  }

  getAllCharacter(searchName: string, searchSpecies: string): Observable<Characters> {
    return this.http.get<Characters>(
      `${this.baseUrl}/character/?name=${searchName}&species=${searchSpecies}`
    )
    .pipe(
      catchError(error => {
        return throwError(() => new Error('No se encontro la información solicitada'))
      })
    );
  }

}
