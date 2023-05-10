import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router\

import { LoginComponent } from './pages/login/login.component';
import { SubjectScoreComponent } from './pages/subject-score/subject-score.component';
import { TuitionFeeComponent } from './pages/tuition-fee/tuition-fee.component';
import { PointTrainingComponent } from './pages/point-training/point-training.component';
import { UserComponent } from './pages/user/user.component';
import { HomeComponent } from './pages/home/home.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { SettingComponent } from './pages/setting/setting.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'point-training', component: PointTrainingComponent, canActivate: [AuthGuard] },
  { path: 'subject-score', loadChildren: () => import('./pages/subject-score/subject-score.module').then(m => m.SubjectScoreModule), canActivate: [AuthGuard] },
  { path: 'tuition-fee', component: TuitionFeeComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
  { path: 'setting', loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule), canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes,  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
