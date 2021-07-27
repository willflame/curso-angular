import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
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

  cadastro: FormGroup;
  gender: IGenderProps[];

  constructor(
    public validateField: ValidarCamposService,
    private fb: FormBuilder,
    private filmeService: FilmesService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  get f(): { [key: string]: AbstractControl; } {
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.createForm();

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
    this.save(filme);
  }

  resetForm(): void {
    this.cadastro.reset();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      imageUrl: ['', [Validators.minLength(10)]],
      releaseDate: ['', [Validators.required]],
      description: [''],
      imdbNote: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      imdbLink: ['', [Validators.minLength(10)]],
      gender: ['', [Validators.required]]
    });
  }

  private save(filme: Filme): void {
    this.filmeService.save(filme).subscribe(() => {
      this.openDialogSuccess();
    },
    () => {
      this.openDialogError();
    });
  }

  private openDialogSuccess(): void {
    const config = {
      data: {
        btnSuccess: "Ir para a listagem",
        btnCancel: "Cadastrar um novo filme",
        btnCancelColor: "primary",
        existBtnClose: true
      } as Alert
    };

    const dialogRef = this.dialog.open(AlertComponent, config);

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.router.navigateByUrl('filmes');
      } else {
        this.resetForm();
      }
    });
  }

  private openDialogError(): void {
    const config = {
      data: {
        title: "Erro ao salvar o registro",
        description: "Não foi possível salvar seu registro, por favor tentar novamente mais tarde",
        btnSuccess: "Fechar",
        btnSuccessColor: "warn"
      } as Alert
    };

    this.dialog.open(AlertComponent, config);
  }
}
