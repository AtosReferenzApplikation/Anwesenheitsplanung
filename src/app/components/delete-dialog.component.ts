import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  template: `
    <nb-card>
      <nb-card-header>Benutzer löschen</nb-card-header>
      <nb-card-body>
        <p>Bist du dir sicher, dass du {{name}} löschen willst?</p>
      </nb-card-body>
      <nb-card-footer style="display: flex;">
        <button nbButton status="danger" (click)="cancel()" style="margin-right: auto;">Abbruch</button>
        <button nbButton status="success"
          (click)="delete()">Löschen</button>
      </nb-card-footer>
    </nb-card>
  `
})
export class DeleteDialogComponent {
  name: string;
  
  constructor(protected dialogRef: NbDialogRef<DeleteDialogComponent>) { }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }
}
