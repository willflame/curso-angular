import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime } from 'rxjs/operators';

import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
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
  readonly noPicture = 'http://www.termoparts.com.br/wp-content/uploads/2017/10no-image.jpg';

  config: ConfigParams = {
    page: 0,
    limit: 4,
  }
  filmes: Filme[] = [];
  filterList: FormGroup;
  gender: IGenderProps[];

  constructor(
    private filmeService: FilmesService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filterList = this.createFilterList();
    this.listFilms();

    this.filterList.get('text').valueChanges
    .pipe(debounceTime(400))
    .subscribe((value: string) => {
      this.config.search = value;
      this.resetSearch();
    });

    this.filterList.get('gender').valueChanges.subscribe((value: string) => {
      this.config.field = { type: 'gender', value };
      this.resetSearch();
    });

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

  open(id: number): void {
    this.router.navigateByUrl(`/filmes/${id}`);
  }

  private listFilms(): void {
    this.config.page++;
    this.filmeService.list(this.config).subscribe((filmes: Filme[]) => {
      this.filmes.push(...filmes);
    });
  }

  private createFilterList(): FormGroup {
    return this.fb.group({
      text: [''],
      gender: ['']
    });
  }

  private resetSearch() {
    this.config.page = 0;
    this.filmes = [];
    this.listFilms();
  }
}
