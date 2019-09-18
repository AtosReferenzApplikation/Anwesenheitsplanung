import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { DialogNamePromptComponent } from '../dialog-name-prompt/dialog-name-prompt.component';
import { DeleteDialogComponent } from '../delete-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  users = [];

  constructor(protected router: Router, private auth: AuthService,
    private firestore: FirestoreService, private toastrService: NbToastrService,
    private dialogService: NbDialogService) { }

  ngOnInit() {
    this.loadUserList();
  }

  loadUserList() {
    this.users = [...[], { name: 'Gast', calendar: [] }]
    this.loading = true;
    this.firestore.getFirestoreSnapshot().subscribe(snap => {
      snap.forEach(doc => {
        this.users = [...this.users, doc.data()];
      });
      this.loading = false;
    });
  }

  login(name: string): void {
    this.auth.login(name).then((success: boolean) => {
      if (success) {
        this.router.navigate(['/home']);
      }
    });
  }

  editUser(user: any, newName: string) {
    this.firestore.updateFirestoreUsername(user, newName).then(() => this.loadUserList());
  }

  deleteUser(user: any) {
    this.dialogService.open(DeleteDialogComponent, {context: {name: user.name}}).onClose.subscribe(isSure => {
      if (isSure) {
        this.firestore.deleteFirestoreUser(user).then(() => this.loadUserList());
      }
    });
  }

  newUser(name: string) {
    if (name.trim() === '') {
      this.showToast('Bitte gib einen Namen ein.', 'Fehler', 'top-start', 'danger');
      return;
    } else if (this.users.findIndex(user => user.name.toLowerCase() === name.toLowerCase()) !== -1) {
      this.showToast('Bitte gib einen anderen Namen ein.', 'Fehler', 'top-start', 'danger');
      return;
    }

    let calendar = [];
    for (let i = 0; i <= 60; i++) {
      const today = moment.utc();
      calendar.push({ date: today.add(i, 'd'), available: false });
    }

    this.setFirestoreUser({ name, calendar });
  }

  setFirestoreUser(user: any) {
    this.firestore.setFirestoreUser(user).then(() => this.login(user));
  }

  openEditDialog(user: any) {
    this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(name => this.editUser(user, name));
  }

  showToast(message: string, title: string, position, status) {
    this.toastrService.show(message, title, { position, status });
  }

}
