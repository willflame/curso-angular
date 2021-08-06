import { Injectable } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  /**
   * Verificar se o campo foi tocado ou sujo e se possui o erro informado.
   * @param control Campo do formulário
   * @param errorName Nome do erro
   */
  hasErrorValidate(control: AbstractControl, errorName: string): boolean {
    if ((control.dirty || control.touched) && this.hasError(control, errorName)) {
      return true;
    }
    return false;
  }

  /**
   * Retornar se o campo possui o erro informado.
   * @param control Campo do formulário
   * @param errorName Nome do error
   */
  hasError(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }

  /**
   * Retornar a quantidade de caracteres validos.
   * @param control Camp do formulário
   * @param errorName Nome do error
   */
  lengthValidate(control: AbstractControl, errorName: string): number {
    const error = control.errors[errorName];
    return error.requiredLength || error.min || error.max || 0;
  }
}
