import { Component, Injector, OnInit } from '@angular/core';
import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss'],
})
export class PointComponent extends Utils implements OnInit {
  points: any[];
  academy_year: any;
  semester: any;
  student: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.student = JSON.parse(this._storageService.getItem('CURRENT_STUDENT')!);

    this.academy_year = this.route.snapshot.paramMap.get('academy_year');
    this.semester = this.route.snapshot.paramMap.get('semester');

    this.getPoint();
  }

  getPoint() {
    this._apiService
      .post('/api/adapter/execute', {
        Method: { Method: 'POST' },
        Url: '/api/subject-score/search',
        Module: 'TEACHER',
        Data: `{"academy_year":"${this.academy_year}","semester":"${this.semester}","student_rcd":"${this.student.student_rcd}","page":1,"pageSize":0}`,
        ContentType: 'application/json',
        AcceptType: 'application/json',
      })
      .subscribe((res: any) => {
        this.points = res.data;
      });
  }
}
