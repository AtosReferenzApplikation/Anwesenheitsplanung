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
  updateInterval;

  // If this value is reduced, data may be permanently lost.
  calendarSize = 60;

  constructor(private firestore: FirestoreService, private auth: AuthService) { }

  ngOnInit() {
    for (let i = 0; i < this.calendarSize; i++) {
      const today = moment.utc();
      this.dates = [...this.dates, today.add(i, 'd').format('DD.MM.')];
    }

    this.updateInterval = setInterval(() => {
      this.saveCurrentUser();
    }, 5000);

    this.firestore.onValueChanges().subscribe(() => this.loadFirestoreUsers());
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
    this.saveCurrentUser();
  }

  changeStatus(name: string, date: moment.Moment) {
    if (date.isoWeekday() === 6 || date.isoWeekday() === 7) { return; }
    if (this.auth.user.name !== name) { return; }
    const userIndex = this.users.findIndex(user => user.name === name);
    const dateIndex = this.users[userIndex].calendar.findIndex(calDate => calDate.date === date);
    this.users[userIndex].calendar[dateIndex].available = !this.users[userIndex].calendar[dateIndex].available;
  }

  getColor(entry) {
    if (!moment.isMoment(entry.date)) { entry.date = moment.utc(entry.date); }
    if (entry.date.isoWeekday() === 6 || entry.date.isoWeekday() === 7) {
      return 'grey';
    }

    return entry.available ? 'green' : 'red';
  }

  loadFirestoreUsers() {
    this.firestore.getFirestoreSnapshot().subscribe(snapshot => {
      this.users = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.calendar) {
          data.calendar.forEach(entry => {
            entry.date = moment.utc(entry.date);
          });
          this.users = [...this.users, data];
        }
      });
      this.unifyDates();
    });
  }

  unifyDates() {
    const today = moment.utc();
    this.users.forEach(user => {
      user.calendar = user.calendar.filter(entry => today.isBefore(entry.date) || today.isSame(entry.date, 'date'));

      // check for missing dates in calendar object
      if (user.calendar.length <= this.calendarSize) {
        const missing = this.calendarSize - user.calendar.length;
        
        for (let index = 0; index <= missing; index++) {
          const now = moment.utc();
          user.calendar.push({ date: now.add(user.calendar.length, 'd'), available: false });
        }
      } else {
        user.calendar = user.calendar.slice(0, this.calendarSize);
      }
    });
  }

  saveCurrentUser() {
    if (this.auth.user.name.toLowerCase() === 'gast') { return; }
    const currentuser = this.users.find(user => user.name === this.auth.user.name);
    return this.firestore.setFirestoreUser(currentuser);
  }

  // onDateCheckChange(value) {
  //   console.log(value)
  // }

}
