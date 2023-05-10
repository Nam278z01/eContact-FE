import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router\

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FeatureComponent } from './feature/feature.component';

const routes: Routes = [
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: '', component: FeatureComponent, canActivate: [AuthGuard] },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
