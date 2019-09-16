import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null;

  constructor(private firestore: FirestoreService, private router: Router) { }

  async login(user: any) {
    const snapshot = await this.firestore.getFirestoreSnapshot().toPromise();
    let userExists = false;
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.name === user.name || user.name.toLowerCase() === 'gast') {
        userExists = true;
        this.user = user;
      }
    });

    return userExists;
  }

  logout() {
    this.router.navigate(['/login']).then(() => this.user = null);
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }
}
