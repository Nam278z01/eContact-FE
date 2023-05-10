import { Component, Injector, OnInit } from '@angular/core';

import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-point-training',
  templateUrl: './point-training.component.html',
  styleUrls: ['./point-training.component.scss'],
})
export class PointTrainingComponent extends Utils implements OnInit {
  point_trainings: any[];
  student: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.student = JSON.parse(this._storageService.getItem('CURRENT_STUDENT')!);
    this.getPointTraining();
  }

  getPointTraining() {
    this._apiService
      .post('/api/adapter/execute', {
        Method: { Method: 'POST' },
        Url: '/api/point-training/search',
        Module: 'TEACHER',
        Data: `{"academy_year":"","semester":"","student_rcd":"${this.student.student_rcd}","class_id":"${this.student.class_id}","page":1,"pageSize":0}`,
        ContentType: 'application/json',
        AcceptType: 'application/json',
      })
      .subscribe((res: any) => {
        this.point_trainings = res.data;
      });
  }
}
