import { Component, Injector, OnInit } from '@angular/core';
import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-tuition-fee',
  templateUrl: './tuition-fee.component.html',
  styleUrls: ['./tuition-fee.component.scss'],
})
export class TuitionFeeComponent extends Utils implements OnInit {
  tuition_fees: any[];
  student: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.student = JSON.parse(this._storageService.getItem('CURRENT_STUDENT')!);
    this.getTuitionFee();
  }

  getTuitionFee() {
    this._apiService
      .post('/api/adapter/execute', {
        Method: { Method: 'POST' },
        Url: '/api/tuition-fee/search',
        Module: 'TEACHER',
        Data: `{"academy_year":"","semester":"","class_id":"${this.student.class_id}","student_rcd":"${this.student.student_rcd}","is_paid":null,"page":1,"pageSize":0}`,
        ContentType: 'application/json',
        AcceptType: 'application/json',
      })
      .subscribe((res: any) => {
        this.tuition_fees = res.data;
      });
  }
}
