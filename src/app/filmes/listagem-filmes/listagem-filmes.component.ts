import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPage = 4;
  page = 0;
  filmes: Filme[];

  constructor(private filmeService: FilmesService) { }

  ngOnInit(): void {
    this.listFilms();
  }

  onScroll(): void {
    this.listFilms();
  }

  private listFilms(): void {
    this.page++;
    this.filmeService.list(this.page, this.qtdPage).subscribe((filmes: Filme[]) => {
      this.filmes?.push(...filmes);
    });
  }
}
