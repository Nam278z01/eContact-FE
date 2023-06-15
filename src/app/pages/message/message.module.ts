import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MessageComponent } from "./message.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { messageRoutes } from "./message.route";
import { MessageSharedModule } from "./shared/message-shared.module";

@NgModule({
  declarations: [MessageComponent, ListUserComponent],
  imports: [MessageSharedModule, RouterModule.forChild(messageRoutes)],
  exports: [], // Do not change "// Append position" line above althought only indent
  providers: [],
})
export class MessageModule {}
