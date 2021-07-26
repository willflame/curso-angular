import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

interface IOptionsProps {
  name?: string;
  value?: string;
}

@Component({
  selector: 'dio-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  @Input() title: string;
  @Input() options: IOptionsProps[];
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  constructor(public validateField: ValidarCamposService) { }
}
