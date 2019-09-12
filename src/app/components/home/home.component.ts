import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  dates = [];
  users = [];
  availableUser = [];

  constructor(private firestore: FirestoreService, private auth: AuthService) { }

  ngOnInit() {
    for (let i = 0; i <= 60; i++) {
      const today = moment.utc();
      this.dates = [...this.dates, today.add(i, 'd').format('DD.MM.')];
    }

    this.loadFirestoreUsers();
  }

  ngOnDestroy(): void {
    this.users.forEach(user => this.firestore.setFirestoreUser(user));
  }

  changeStatus(name: string, date: moment.Moment) {
    if (date.isoWeekday() === 6 || date.isoWeekday() === 7) { return; }
    if (this.auth.user.name !== name) { return; }
    const userIndex = this.users.findIndex(user => user.name === name);
    const dateIndex = this.users[userIndex].calendar.findIndex(calDate => calDate.date === date);
    this.users[userIndex].calendar[dateIndex].available = !this.users[userIndex].calendar[dateIndex].available;
  }

  getColor(entry) {
    if (entry.date.isoWeekday() === 6 || entry.date.isoWeekday() === 7) {
      return 'grey';
    }

    return entry.available ? 'green' : 'red';
  }

  loadFirestoreUsers() {
    this.firestore.getFirestoreSnapshot().subscribe(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.calendar) {
          data.calendar.forEach(entry => {
            entry.date = moment.utc(entry.date)
          });
          this.users = [...this.users, data];
        }
      });
    });
  }

  // onDateCheckChange(value) {
  //   console.log(value)
  // }

}
