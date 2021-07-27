import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';

const url = "http://localhost:3000/filmes/";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  save(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  list(page: number, qtdPage: number): Observable<Filme[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', page.toString())
    httpParams = httpParams.set('_limit', qtdPage.toString());
    return this.http.get<Filme[]>(url,{ params: httpParams });
  }
}
