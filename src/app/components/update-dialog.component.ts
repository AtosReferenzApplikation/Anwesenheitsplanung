import { Component } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  template: `
    <nb-card>
      <nb-card-header>App update!</nb-card-header>
      <nb-card-body>
        <p>Newer version of the app is available. It's a quick refresh away!</p>
      </nb-card-body>
      <nb-card-footer>
        <button nbButton status="danger" (click)="cancel()">Cancel</button>
        <button nbButton status="success"
          (click)="refresh()">Submit</button>
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
