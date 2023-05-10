import { Component, Injector, OnInit } from '@angular/core';
import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends Utils implements OnInit {

  student: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent() {
    this._apiService.post('/api/adapter/execute', {
      Method: { Method: 'GET' },
      Url: '/api/subject-score/get-student-by-family',
      Module: 'TEACHER',
    })
    .subscribe((res: any) => {

      this.student = res.data[0];
    })
  }

}
