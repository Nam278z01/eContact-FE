import { NgModule } from "@angular/core";
import { DateDisplayPipe } from "../pipe/display-date.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [DateDisplayPipe],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [FormsModule, ReactiveFormsModule, CommonModule, DateDisplayPipe],
  providers: [],
})
export class MessageSharedModule {}
