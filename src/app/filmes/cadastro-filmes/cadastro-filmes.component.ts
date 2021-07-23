import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor(public validateField: ValidarCamposService,
    private fb: FormBuilder,) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      imageUrl: ['', [Validators.minLength(10)]],
      releaseDate: ['', [Validators.required]],
      description: [''],
      imdbNote: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      imdbLink: ['', [Validators.minLength(10)]],
      gender: ['', [Validators.required]]
    });

  }

  salve(): void {
    if (this.cadastro.invalid) {
      return;
    }

    alert("message");
  }

  resetForm() {
    this.cadastro.reset();
  }

}
