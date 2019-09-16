import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './services/auth/auth.service';
import { NbDialogService } from '@nebular/theme';
import { UpdateDialogComponent } from './components/update-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router, private auth: AuthService, private swUpdate: SwUpdate, private dialogService: NbDialogService) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async () => {
        this.dialogService.open(UpdateDialogComponent);
      });
    }
  }

  logout() {
    this.auth.logout();
  }
}
