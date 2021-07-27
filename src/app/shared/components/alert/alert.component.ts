import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alert = {
    title: "Sucesso!",
    description: "Seu registro foi salvo cadastrado com sucesso!",
    btnSuccess: "OK",
    btnCancel: "Cancelar",
    btnSuccessColor: "accent",
    btnCancelColor: "warn",
    existBtnClose: true
  } as Alert

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alert) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data) {
      this.alert.title = this.data.title || this.alert.title;
      this.alert.description = this.data.description || this.alert.description;
      this.alert.btnSuccess = this.data.btnSuccess || this.alert.btnSuccess;
      this.alert.btnCancel = this.data.btnCancel || this.alert.btnCancel;
      this.alert.btnSuccessColor = this.data.btnSuccessColor || this.alert.btnSuccessColor;
      this.alert.btnCancelColor = this.data.btnCancelColor || this.alert.btnCancelColor;
      this.alert.existBtnClose = this.data.existBtnClose || this.alert.existBtnClose;
    }
  }
}
