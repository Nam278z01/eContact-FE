import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NoMessageComponent } from "./no-message.component";
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MessageSharedModule } from "../shared/message-shared.module";


@NgModule({
  declarations: [NoMessageComponent],
  imports: [
    MessageSharedModule,
    RouterModule.forChild([
      { path: "", component: NoMessageComponent, canActivate: [AuthGuard] },
    ]), // Append position
  ],
  exports: [], // Do not change "// Append position" line above althought only indent
  providers: [],
})
export class NoMessageModule {}
