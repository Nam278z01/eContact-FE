import { Component, OnInit, Input } from "@angular/core";
import { Injector } from "@angular/core";
import { UserInChatModel } from "../entities/user-in-chat-model";
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
} from "@angular/router";
import { ChatFirebaseService } from "../service/chat-firebase.service";
import { DatePipe } from "@angular/common";
import { ApiService } from "src/app/core/services/api.service";
import { Location } from '@angular/common';

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  providers: [DatePipe]
})
export class ListUserComponent implements OnInit {
  public usersInCharSearch: UserInChatModel[];
  public myChat$ = this.chatFirebaseService.myChats$;
  public chatId: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatFirebaseService: ChatFirebaseService,
    private _apiService: ApiService,
    private _location: Location

  ) {
  }

  ngOnInit() {
    this.activeUserTexted();
  }

  public activeUserTexted() {
    this.chatId = this.route.firstChild!.snapshot.paramMap.get("conversation_id");

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes("message/chat-message/")) {
          this.chatId = this.route.firstChild!.snapshot.paramMap.get("conversation_id");
        } else {
          this.chatId = null;
        }
      }
    });
  }

  public changeTextSearch(textSearch: any) {
    if (textSearch) {
      this._apiService
        .post("/api/adapter/execute", {
          Method: { Method: "POST" },
          Url: "/api/message/search-list-teacher",
          Module: "TEACHER",
          Data: JSON.stringify({
            page: 1,
            pageSize: 10,
            text_search: textSearch.target.value,
          }),
          ContentType: 'application/json',
          AcceptType: 'application/json',
        })
        .subscribe((res: any) => {
          this.usersInCharSearch = res.data;
        });
    } else {
      this.usersInCharSearch = [];
    }
  }

  backClicked() {
    if (history.length <= 1) {
      // No history URL available
      // Perform alternative action or display a message
      this.router.navigate(['/']);
    } else {
      // Call the back() method to navigate back
      this._location.back();
    }
  }

  ngOnDestroy(): void {

  }
}
