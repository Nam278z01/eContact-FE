import { Component, Injector, OnInit } from '@angular/core';
import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-academy-year',
  templateUrl: './academy-year.component.html',
  styleUrls: ['./academy-year.component.scss']
})
export class AcademyYearComponent extends Utils implements OnInit {

  academy_years: any[];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAcademyYear();
  }

  getAcademyYear() {
    this._apiService
      .post('/api/adapter/execute', {
        Method: { Method: 'GET' },
        Url: "/api/subject-score/get-academy-year-dropdown?class_id=101191A",
        Module: 'TEACHER',
      })
      .subscribe((res: any) => {
        this.academy_years = res.data;
      });
  }

}
