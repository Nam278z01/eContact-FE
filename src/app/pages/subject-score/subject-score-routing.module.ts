import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router\

import { PointComponent } from './point/point.component';
import { SemesterComponent } from './semester/semester.component';
import { AcademyYearComponent } from './academy-year/academy-year.component';

import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: ':academy_year/:semester', component: PointComponent, canActivate: [AuthGuard] },
  { path: ':academy_year', component: SemesterComponent, canActivate: [AuthGuard] },
  { path: '', component: AcademyYearComponent, canActivate: [AuthGuard] },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectScoreRoutingModule { }
