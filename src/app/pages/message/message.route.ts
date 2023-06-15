import { Routes } from "@angular/router";
import { MessageComponent } from "./message.component";

export const messageRoutes: Routes = [
  {
    path: "",
    component: MessageComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./no-message/no-message.module").then(
            (m) => m.NoMessageModule
          ),
      },
      {
        path: "chat-message/:conversation_id",
        loadChildren: () =>
          import("./chat-message/chat-message.module").then(
            (m) => m.ChatMessageModule
          ),
      },
      {
        path: "new-message/:user_id",
        loadChildren: () =>
          import("./new-message/new-message.module").then(
            (m) => m.NewMessageModule
          ),
      },
    ],
  },
];
