import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectScoreRoutingModule } from './subject-score-routing.module';
import { PointComponent } from './point/point.component';
import { SemesterComponent } from './semester/semester.component';
import { AcademyYearComponent } from './academy-year/academy-year.component';

@NgModule({
  declarations: [
    AcademyYearComponent,
    SemesterComponent,
    PointComponent
  ],
  imports: [
    CommonModule,
    SubjectScoreRoutingModule
  ],
  providers: [],
})
export class SubjectScoreModule { }
