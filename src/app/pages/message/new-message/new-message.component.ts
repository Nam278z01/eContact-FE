import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Injector } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { UserInChatModel } from "../entities/user-in-chat-model";
import { ChatFirebaseService } from "../service/chat-firebase.service";
import { Observable, Subject } from "rxjs";
import { Message } from "../entities/message";
import { DatePipe } from "@angular/common";
import { ApiService } from "src/app/core/services/api.service";
import { ProfileUser } from "../entities/profile-user";

@Component({
  selector: "app-chat-message",
  templateUrl: "./new-message.component.html",
  providers: [DatePipe]
})
export class NewMessageComponent implements OnInit {
  public conversation_id: string;
  public user_id: string;
  public showInputChat: boolean = false;
  public sendMessageForm: FormGroup;
  public submitting: boolean;
  public otherUser?: UserInChatModel;
  public messages$: Observable<Message[]>;
  public currentUser: ProfileUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatFirebaseService: ChatFirebaseService,
    private _apiService: ApiService
  ) {
    this.sendMessageForm = new FormGroup({
      message_content: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    this.currentUser = this.chatFirebaseService.currentUser;

    this.submitting = false;

    this.route.params.subscribe((params) => {
      this.user_id = params["user_id"];

      this.isExistingChat(this.user_id);
      this.getUser();
    });
  }

  public isExistingChat(otherUserId: string) {
    const subscription = this.chatFirebaseService.isExistingChat(otherUserId).subscribe(res => {
      if (res) {
        this.router.navigateByUrl("/message/chat-message/" + res);
      } else {
        this.showInputChat = true;
      }
      subscription.unsubscribe();
    })

  }

  public getUser() {
    this._apiService
      .post("/api/adapter/execute", {
        Method: { Method: "POST" },
        Url: "/api/message/get-user",
        Module: "TEACHER",
        Data: JSON.stringify({
          page: 0,
          pageSize: 0,
          user_id: this.user_id,
        }),
        ContentType: 'application/json',
        AcceptType: 'application/json',
      })
      .subscribe((res: any) => {
        this.otherUser = res.data;
      });
  }

  public sendMessage() {
    if (!this.submitting) {
      this.submitting = true;

      this.chatFirebaseService
        .createChat(
          this.otherUser!,
          this.sendMessageForm.controls['message_content'].value
        )
        .then(
          (chatId: string) => {
            console.log(chatId)
            this.router.navigateByUrl("/message/chat-message/" + chatId);
            this.submitting = false;
          },
          (err: any) => {
            this.submitting = false;
          }
        );
    }
  }
}
