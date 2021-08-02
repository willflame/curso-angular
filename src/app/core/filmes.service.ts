import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigParams } from '../shared/models/config-params';
import { Filme } from '../shared/models/filme';
import { ConfigParamsService } from './config-params.service';

const url = "http://localhost:3000/filmes/";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(
    private http: HttpClient,
    private configService: ConfigParamsService
  ) { }

  save(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  edit(filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(url + filme.id, filme);
  }

  list(config: ConfigParams):Observable<Filme[]> {
    const configParams = this.configService.configParams(config);

    return this.http.get<Filme[]>(url,{ params: configParams });
  }

  getFilme(id: number): Observable<Filme> {
    return this.http.get<Filme>(url + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
