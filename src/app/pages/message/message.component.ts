import { Component, OnInit } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { FirebaseService } from "src/app/core/services/firebase.service";
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class MessageComponent implements OnInit {
  public conversation_id: string;
  public showListUser = true;
  constructor(
    private firebase: FirebaseService,
    private router: Router

  ) {

  }

  ngOnInit() {
    this.firebase.requestPermission();

    if (this.router.url != '/message') {
      this.showListUser = false;
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

      }

      if (event instanceof NavigationEnd) {
        if (this.router.url != '/message') {
          this.showListUser = false;
        }
        else {
          this.showListUser = true;
        }
      }
    });
  }
}
