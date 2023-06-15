import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { NewMessageComponent } from "./new-message.component";
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MessageSharedModule } from "../shared/message-shared.module";


@NgModule({
  declarations: [NewMessageComponent],
  imports: [
    MessageSharedModule,
    RouterModule.forChild([
      { path: "", component: NewMessageComponent, canActivate: [AuthGuard] },
    ]), // Append position
  ],
  exports: [], // Do not change "// Append position" line above althought only indent
  providers: [],
})
export class NewMessageModule {}
