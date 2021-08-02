import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { FilmesService } from 'src/app/core/filmes.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alert } from 'src/app/shared/models/alert';
import { Filme } from '../../shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.css']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly noPicture = 'http://www.termoparts.com.br/wp-content/uploads/2017/10no-image.jpg';
  filme: Filme;
  id: number;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private filmeService: FilmesService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  edit(): void {
    this.router.navigateByUrl(`/filmes/cadastro/${this.id}`);
  }

  delete(): void {
    const config = {
      data: {
        title: "Você tem certeza que deseja excluir?",
        description: "Caso você tenha certeza que deseja excluir, clique no botão OK",
        btnCancelSuccess: "warn",
        btnCancelColor: "primary",
        existBtnClose: true
      } as Alert
    };

    const dialogRef = this.dialog.open(AlertComponent, config);

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.filmeService.delete(this.id)
          .subscribe(() => this.router.navigateByUrl('filmes'));
      }
    });
  }

  private visualizar(): void {
    this.filmeService.getFilme(this.id).subscribe((filme: Filme) => {
      this.filme = filme;
    });
  }

}
