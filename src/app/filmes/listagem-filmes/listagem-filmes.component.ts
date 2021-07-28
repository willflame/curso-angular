import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

interface IGenderProps {
  name: string;
  value: string;
}

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPage = 4;
  page = 0;
  filmes: Filme[] = [];
  filterList: FormGroup;
  gender: IGenderProps[];

  constructor(
    private filmeService: FilmesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filterList = this.createFilterList();
    this.listFilms();

    this.gender = [
      { name: "Ação", value: "Ação"  },
      { name: "Aventura", value: "Aventura"  },
      { name: "Comédia", value: "Comédia"  },
      { name: "Drama", value: "Drama"  },
      { name: "Ficção Científica", value: "Ficção Científica"  },
      { name: "Romance", value: "Romance"  },
      { name: "Terror", value: "Terror"  },
    ];
  }

  onScroll(): void {
    this.listFilms();
  }

  private listFilms(): void {
    this.page++;
    this.filmeService.list(this.page, this.qtdPage).subscribe((filmes: Filme[]) => {
      this.filmes.push(...filmes);
    });
  }

  private createFilterList(): FormGroup {
    return this.fb.group({
      text: [''],
      gender: ['']
    });
  }
}
