import { Injectable } from "@angular/core";
import { ProfileUser } from "../entities/profile-user";
import { UserInChatModel } from "../entities/user-in-chat-model";
import firebase from "firebase/app";
import { Chat } from "../entities/chat";
import { Observable, Observer, from, of, throwError } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { Message } from "../entities/message";

import { StorageService } from "src/app/core/services/storage.service";
import { FirebaseService } from "src/app/core/services/firebase.service";

@Injectable({
  providedIn: "root",
})
export class ChatFirebaseService {
  currentUser: ProfileUser;
  constructor(
    private firebaseService: FirebaseService,
    private _storageService: StorageService
  ) {
    let user = JSON.parse(
      this._storageService.getItem('CURRENT_USER')!
    );
    console.log(user)

    this.currentUser = {
      userId: user.user_id,
      userName: user.full_name,
      userPhotoUrl: user.avatar,
    };
  }

  get myChats$(): Observable<Chat[]> {
    const collectionRef = this.firebaseService.db.collection("chats");
    return new Observable<Chat[]>((observer: Observer<Chat[]>) => {
      const unsubscribe = collectionRef
        .where("userIds", "array-contains", this.currentUser.userId)
        .orderBy("lastMessageDate", "desc")
        .onSnapshot((querySnapshot) => {
          const chats: Chat[] = [];
          querySnapshot.forEach((doc) => {
            const chatData = doc.data() as Chat;
            chatData.id = doc.id;
            console.log(chatData);
            chats.push(chatData as Chat);
          });
          observer.next(chats);
        });

      return () => {
        unsubscribe();
      };
    }).pipe(
      map((chats: any) =>
        this.addMoreInformation(this.currentUser.userId, chats)
      )
    ) as Observable<Chat[]>;
  }

  createChat(otherUser: UserInChatModel, message: string) {
    const collectionRef = this.firebaseService.db.collection("chats");

    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

    const chatData = {
      userIds: [this.currentUser.userId, otherUser.person_id],
      lastMessage: message,
      lastMessageDate: serverTimestamp,
      lastUserIdMessage: this.currentUser.userId,
      users: [
        {
          userId: this.currentUser.userId,
          userName: this.currentUser.userName,
          userPhotoUrl: this.currentUser.userPhotoUrl,
        },
        {
          userId: otherUser.person_id,
          userName: otherUser.full_name,
          userPhotoUrl: otherUser.avatar,
        },
      ],
      notSeenBy: [
        {
          userId: this.currentUser.userId,
          count: 0,
        },
        {
          userId: otherUser.person_id,
          count: 1,
        },
      ],
      isActive: {
        [this.currentUser.userId]: true,
        [otherUser.person_id.toString()]: false,
      },
    };

    // Step 1: Create the main chat document without the "messages" field
    return collectionRef.add(chatData).then((chatDocRef) => {
      // Step 2: Get a reference to the newly created chat document
      const chatId = chatDocRef.id;
      const chatRef = collectionRef.doc(chatId);

      // Step 3: Create a "messages" subcollection within the chat document
      const messagesCollectionRef = chatRef.collection("messages");

      const messageData = {
        senderId: this.currentUser.userId,
        senderName: this.currentUser.userName,
        senderPhotoUrl: this.currentUser.userPhotoUrl,
        sendDate: serverTimestamp,
        content: message,
        type: "text",
      };
      // Step 4: Add the message document to the "messages" subcollection

      return messagesCollectionRef.add(messageData).then(() => chatId);
    });
  }

  isExistingChat(otherUserId: string): Observable<string | null> {
    return this.myChats$.pipe(
      map((chats) => {
        for (let i = 0; i < chats.length; i++) {
          if (chats[i].userIds.includes(otherUserId)) {
            return chats[i].id;
          }
        }
        return null;
      })
    );
  }

  chooseChat(chatId: string) {
    const chatDocRef = this.firebaseService.db.collection("chats").doc(chatId);
    return from(chatDocRef.get()).pipe(
      switchMap((chatDoc: any) => {
        if (chatDoc.exists) {
          const batch = this.firebaseService.db.batch();

          const notSeenByRef = chatDoc.data().notSeenBy;
          const updatedNotSeenBy = notSeenByRef.map((entry: any) => {
            if (entry.userId === this.currentUser.userId) {
              return {
                userId: entry.userId,
                count: 0,
              };
            }
            return entry;
          });
          batch.update(chatDocRef, { notSeenBy: updatedNotSeenBy });

          const chatData = { isActive: { [this.currentUser.userId]: true } };

          batch.set(chatDocRef, chatData, { merge: true });

          return from(batch.commit());
        } else {
          return throwError(new Error("Chat document not found"));
        }
      })
    );
  }

  leaveChat(chatId: string) {
    const chatDocRef = this.firebaseService.db.collection("chats").doc(chatId);

    return chatDocRef.set({ isActive: { [this.currentUser.userId]: false } }, { merge: true });
  }

  getChatById(chatId: string): Promise<Chat | undefined> {
    const chatQuery = this.firebaseService.db.collection("chats")
      .where("userIds", "array-contains", this.currentUser.userId)
      .where(firebase.firestore.FieldPath.documentId(), "==", chatId);

    return chatQuery.get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const chatDoc = querySnapshot.docs[0];
        const chatData = chatDoc.data() as Chat;
        chatData.id = chatDoc.id;
        this.addMoreInfo(this.currentUser.userId, chatData)
        return chatData;
      } else {
        return undefined;
      }
    });
  }

  getChatMessages(chatId: string): Observable<Message[]> {
    const messagesCollectionRef = this.firebaseService.db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("sendDate", "asc");

    return new Observable<Message[]>((observer: Observer<Message[]>) => {
      const unsubscribe = messagesCollectionRef.onSnapshot((querySnapshot) => {
        const messages: Message[] = [];
        querySnapshot.forEach((doc) => {
          const messageData = doc.data() as Message;
          console.log(messageData)
          messages.push(messageData);
        });
        observer.next(messages);
      });

      return () => {
        unsubscribe();
      };
    });
  }

  sendMessage(chatId: string, message: string) {
    const chatDocRef = this.firebaseService.db.collection("chats").doc(chatId);
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

    return from(chatDocRef.get()).pipe(
      switchMap((chatDoc: any) => {
        if (chatDoc.exists && chatDoc.data().userIds.includes(this.currentUser.userId)) {
          const messagesCollectionRef = chatDoc.ref.collection("messages");

          const newMessage: Message = {
            senderId: this.currentUser.userId,
            senderName: this.currentUser.userName,
            senderPhotoUrl: this.currentUser.userPhotoUrl,
            sendDate: serverTimestamp,
            content: message,
            type: "text",
          };

          const batch = this.firebaseService.db.batch();

          // Add the new message to the messages subcollection
          const newMessageRef = messagesCollectionRef.doc();
          batch.set(newMessageRef, newMessage);

          // Update the lastMessage and notSeenBy fields in the chat document
          batch.update(chatDocRef, {
            lastMessage: message,
            lastMessageDate: serverTimestamp,
            lastUserIdMessage: this.currentUser.userId,
          });

          const otherUserIndex = chatDoc.data().userIds.indexOf(this.currentUser.userId) === 0 ? 1 : 0;
          const recipientIsActive = chatDoc.data().isActive[chatDoc.data().userIds[otherUserIndex]];
          // If the recipient is active, do not increase the count in notSeenBy
          if (!recipientIsActive) {
            // Update the count value for the specific notSeenBy entry
            const notSeenByRef = chatDoc.data().notSeenBy;
            const updatedNotSeenBy = notSeenByRef.map((entry: any) => {
              if (entry.userId !== this.currentUser.userId) {
                return {
                  userId: entry.userId,
                  count: entry.count + 1,
                };
              }
              return entry;
            });
            batch.update(chatDocRef, { notSeenBy: updatedNotSeenBy });
          }

          return from(batch.commit());
        } else {
          return throwError(new Error("Chat document not found or user not included in the chat"));
        }
      })
    );
  }

  addMoreInformation(currentUserId: string, chats: Chat[]): Chat[] {
    chats.forEach((chat: Chat) => {
      this.addMoreInfo(currentUserId, chat);
    });

    return chats;
  }

  addMoreInfo(currentUserId: string, chat: Chat) {
    const otherUserIndex = chat.userIds.indexOf(currentUserId) === 0 ? 1 : 0;
    const { userName, userPhotoUrl, userId } = chat.users[otherUserIndex];
    chat.chatName = userName;
    chat.chatPic = userPhotoUrl;
    chat.chatUserId = userId;
    // count message not seen
    const myIdIndex = chat.notSeenBy.findIndex(
      (n) => n.userId == currentUserId
    );
    chat.countMessageNotSeen = chat.notSeenBy[myIdIndex].count;
    // lastUserMessage
    chat.lastUserNameMessage = chat.lastUserIdMessage === currentUserId ? "Bạn: " : "";
  }

  async sendMessageCloud(user_id: string, title: string, body: string, click_action: string) {
    this.firebaseService.sendMessage(user_id, title, body, click_action)
  }
}
