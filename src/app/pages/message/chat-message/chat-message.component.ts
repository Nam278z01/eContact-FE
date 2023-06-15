import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Injector } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserInChatModel } from "../entities/user-in-chat-model";
import { ElementRef } from "@angular/core";
import { Message } from "../entities/message";
import { ChatFirebaseService } from "../service/chat-firebase.service";
import { Chat } from "../entities/chat";
import { tap } from "rxjs/operators";
import { DateDisplayPipe } from "../pipe/display-date.pipe";
import { DatePipe } from "@angular/common";
import { ApiService } from "src/app/core/services/api.service";
import { ProfileUser } from "../entities/profile-user";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  providers: [DatePipe]
})
export class ChatMessageComponent
  implements OnInit, AfterViewInit
{
  @ViewChild("endOfChat", {read: true, static: true}) endOfChat!: ElementRef;
  public conversation_id: string;
  public messages$: Observable<Message[]>;
  public showInputChat: boolean = false;
  public usersInChat: UserInChatModel[];
  public sendMessageForm: FormGroup;
  public chatCurrent: Chat;
  public otherUser?: UserInChatModel;
  public submitting = false;
  public currentUser: ProfileUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatFirebaseService: ChatFirebaseService,
    private _apiService: ApiService
  ) {
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.currentUser = this.chatFirebaseService.currentUser;

    this.sendMessageForm = new FormGroup({
      message_content: new FormControl("", [Validators.required]),
    });

    this.route.params.subscribe((params) => {
      if (this.conversation_id) {
        this.chatFirebaseService.leaveChat(this.conversation_id);
      }
      this.conversation_id = params["conversation_id"];

      this.getChatCurrent(this.conversation_id);
      this.chatFirebaseService.chooseChat(this.conversation_id).subscribe();

      this.showInputChat = true;
    });
  }

  getChatCurrent(chatId: string) {
    this.chatFirebaseService.getChatById(chatId).then((res) => {
      if (res) {
        this.chatCurrent = res;
        this.getUser(this.chatCurrent.chatUserId);

        this.messages$ = this.chatFirebaseService
          .getChatMessages(this.conversation_id)
          .pipe(
            tap(() => {
              this.scrollToBottom();
            })
          );
      } else {
        this.router.navigateByUrl("/message");
      }
    });
  }

  public getUser(user_id: string) {
    this._apiService
      .post("/api/adapter/execute", {
        Method: { Method: "POST" },
        Url: "/api/message/get-user",
        Module: "TEACHER",
        Data: JSON.stringify({
          page: 0,
          pageSize: 0,
          user_id: user_id,
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
        .sendMessage(
          this.conversation_id,
          this.sendMessageForm.controls['message_content'].value
        )
        .subscribe(
          (res) => {
            this.submitting = false;

            this.chatFirebaseService.sendMessageCloud(this.chatCurrent.chatUserId, this.chatFirebaseService.currentUser.userName, this.sendMessageForm.controls['message_content'].value, 'message/chat-message/' + this.conversation_id);

            this.sendMessageForm.controls["message_content"].setValue("");
          },
          (error) => {
            this.submitting = false;
          }
        );
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
  ngOnDestroy(): void {
    if (this.conversation_id) {
      this.chatFirebaseService.leaveChat(this.conversation_id);
    }
  }
}
