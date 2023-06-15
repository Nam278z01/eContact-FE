import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";

import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  database: any;

  currentUser;

  firebaseApp;
  db;
  messaging;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "key=AAAAi0yCezE:APA91bGtUlO6U_2SAqcDqJdNPNhy7JXU0Uf3J8eGKSoMa4x8HokwMfCSKP9MlQAfze2x5ue0TAZdEg14WO8m4yxGpJsrCe3ghD9sfNXxLdivMaQJpEg3OiKrFGP34Vflhr6NDrtxhHRG",
    }),
  };

  constructor(private http: HttpClient, private _storageService: StorageService) {

    this.currentUser = JSON.parse(this._storageService.getItem('CURRENT_USER')!);

    this.firebaseApp = firebase.initializeApp(environment.firebase);

    this.db = firebase.firestore();

    this.messaging = firebase.messaging();
  }

  getToken(user_id: string) {
    return this.db
    .collection("tokens")
    .where("user_id", "==", user_id)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        let token: any[] = []
        querySnapshot.forEach((doc: any) => {
          token.push(doc.data().token)
        });
        console.log(token)
        return token;
      } else {
        console.log("ko có")
        return [];
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }

  async sendMessage(user_id: string, title: string, body: string, click_action: string) {
    console.log(user_id)
    let token = await this.getToken(user_id)

    console.log(user_id)
    console.log(token)

    this.http
      .post<any>(
        "https://fcm.googleapis.com/fcm/send",
        {
          notification: {
            title: title,
            body: body,
          },
          registration_ids: token,
          data: {
            click_action: click_action
          }
        },
        this.httpOptions
      )
      .subscribe();
  }

  requestPermission() {
    this.messaging
      .getToken({ vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          this.subscribeToNotification(currentToken);
          console.log(currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  }

  subscribeToNotification(currentToken: string) {
    this.db
      .collection("tokens")
      .where("token", "==", currentToken)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            this.db.collection("tokens").doc(doc.id).update({
              user_id: this.currentUser.user_id,
              token: currentToken,
            });
          });
        } else {
          this.db
            .collection("tokens")
            .add({
              user_id: this.currentUser.user_id,
              token: currentToken,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

}
