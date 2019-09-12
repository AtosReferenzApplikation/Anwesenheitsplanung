import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-dialog-name-prompt',
  templateUrl: './dialog-name-prompt.component.html',
  styleUrls: ['./dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<DialogNamePromptComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  submit(name) {
    this.dialogRef.close(name);
  }

}
