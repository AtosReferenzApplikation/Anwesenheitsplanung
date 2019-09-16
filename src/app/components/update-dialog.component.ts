import { Component } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  template: `
    <nb-card>
      <nb-card-header>App update!</nb-card-header>
      <nb-card-body>
        <p>Eine neue Version der App ist verfügbar. Lade die Seite einfach neu!</p>
      </nb-card-body>
      <nb-card-footer style="display: flex;">
        <button nbButton status="danger" (click)="cancel()" style="margin-right: auto;">Abbruch</button>
        <button nbButton status="success"
          (click)="refresh()">Neu laden</button>
      </nb-card-footer>
    </nb-card>
  `
})
export class UpdateDialogComponent {
  constructor(protected dialogRef: NbDialogRef<UpdateDialogComponent>) { }

  cancel() {
    this.dialogRef.close();
  }

  refresh() {
    window.location.reload();
  }
}
