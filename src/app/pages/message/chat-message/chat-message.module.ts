import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChatMessageComponent } from "./chat-message.component";
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MessageSharedModule } from "../shared/message-shared.module";


@NgModule({
  declarations: [ChatMessageComponent],
  imports: [
    MessageSharedModule,
    RouterModule.forChild([
      { path: "", component: ChatMessageComponent, canActivate: [AuthGuard] },
    ]), // Append position
  ],
  exports: [], // Do not change "// Append position" line above althought only indent
  providers: [],
})
export class ChatMessageModule {}
