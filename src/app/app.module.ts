import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { PointTrainingComponent } from './pages/point-training/point-training.component';
import { SubjectScoreComponent } from './pages/subject-score/subject-score.component';
import { TuitionFeeComponent } from './pages/tuition-fee/tuition-fee.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { SettingComponent } from './pages/setting/setting.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    PointTrainingComponent,
    SubjectScoreComponent,
    TuitionFeeComponent,
    NotificationComponent,
    SettingComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        maxOpened: 1,
        progressBar: true,
        progressAnimation: 'decreasing',
        preventDuplicates: true,
        positionClass: 'toast-top-right',
      }),
    LoadingBarRouterModule,
    LoadingBarHttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
