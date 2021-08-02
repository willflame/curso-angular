import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alert } from 'src/app/shared/models/alert';
import { Filme } from 'src/app/shared/models/filme';

interface IGenderProps {
  name: string;
  value: string;
}

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {
  id: number;
  cadastro: FormGroup;
  gender: IGenderProps[];

  constructor(
    public validateField: ValidarCamposService,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f(): { [key: string]: AbstractControl; } {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.filmeService.getFilme(this.id)
        .subscribe((filme: Filme) => {
          this.cadastro = this.createForm(filme);
        });
    } else  {
      this.cadastro = this.createForm(this.createdFilmeEmpty());
    }

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

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.edit(filme);
    } else {
      this.save(filme);
    }
  }

  resetForm(): void {
    this.cadastro.reset();
  }

  private createForm(filme: Filme): FormGroup {
    return this.fb.group({
      title: [filme.title, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      imageUrl: [filme.imageUrl, [Validators.minLength(10)]],
      releaseDate: [filme.releaseDate, [Validators.required]],
      description: [filme.description],
      imdbNote: [filme.imdbNote, [Validators.required, Validators.min(0), Validators.max(10)]],
      imdbLink: [filme.imdbLink, [Validators.minLength(10)]],
      gender: [filme.gender, [Validators.required]]
    });
  }

  private createdFilmeEmpty(): FormGroup {
    return {
      id: null,
      title: null,
      imageUrl: null,
      releaseDate: null,
      description: null,
      imdbNote: 0,
      imdbLink: null,
      gender: null
    } as Filme;
  }

  private save(filme: Filme): void {
    this.filmeService.save(filme).subscribe(() => {
      const config = {
        data: {
          btnSuccess: "Ir para a listagem",
          btnCancel: "Cadastrar um novo filme",
          btnCancelColor: "primary",
          existBtnClose: true
        } as Alert
      };

      this.openDialogSuccess(config);
    },
    () => {
      const config = {
        data: {
          description: "Seu registro foi atualizado com sucesso!",
          btnSuccess: "Ir para a listagem",
        } as Alert
      };

      this.openDialogError(config);
    });
  }

  private edit(filme: Filme): void {
    this.filmeService.edit(filme).subscribe(() => {
      const config = {
        data: {
          description: "Seu registro foi atualizado com sucesso!",
          btnSuccess: "Ir para a listagem",
        } as Alert
      };

      this.openDialogSuccess(config);
    },
    () => {
      const config = {
        data: {
          title: "Erro ao editar o registro",
          description: "Não foi possível editar seu registro, por favor tentar novamente mais tarde",
          btnSuccess: "Fechar",
          btnSuccessColor: "warn"
        } as Alert
      };

      this.openDialogError(config);
    });
  }

  private openDialogSuccess(config: Alert): void {
    const dialogRef = this.dialog.open(AlertComponent, config);

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.router.navigateByUrl('filmes');
      } else {
        this.resetForm();
      }
    });
  }

  private openDialogError(config: Alert): void {
    this.dialog.open(AlertComponent, config);
  }
}
