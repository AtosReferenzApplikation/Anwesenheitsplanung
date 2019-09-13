import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.collection = this.firestore.collection('users');
  }

  getFirestoreSnapshot(): Observable<firebase.firestore.QuerySnapshot> {
    return this.collection.get();
  }

  setFirestoreUser(user: any): Promise<void> {
    if (user.name.length >= 10) {
      user.name = user.name.substring(0, 9);
    }
    user.calendar.forEach(entry => {
      entry.date = entry.date.valueOf();
    });
    return this.collection.doc(user.name).set(user);
  }

  async updateFirestoreUsername(user: any, newName: string): Promise<void> {
    if (newName.length >= 10) {
      newName = newName.substring(0, 9);
    }
    await this.deleteFirestoreUser(user);
    user.name = newName;
    user.calendar.forEach(entry => {
      entry.date = entry.date.valueOf();
    });
    return this.collection.doc(user.name).set(user);
  }

  deleteFirestoreUser(user: any): Promise<void> {
    return this.collection.doc(user.name).delete();
  }

  onValueChanges(): Observable<firebase.firestore.DocumentData[]> {
    return this.collection.valueChanges();
  }
}
