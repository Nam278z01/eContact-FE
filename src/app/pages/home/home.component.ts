import { Component, Injector, OnInit } from '@angular/core';
import { Utils } from 'src/app/core/common/utils';

import { ApiService } from './../../core/services/api.service';
import { StorageService } from './../../core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Utils implements OnInit {

  student: any;
  user: any;
  count_unchecked_notification: number = 0;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.user = JSON.parse(this._storageService.getItem('CURRENT_USER')!);
    this.student = JSON.parse(this._storageService.getItem('CURRENT_STUDENT')!);

    this.CountUncheckedNotification();
  }

  public CountUncheckedNotification() {
    this._apiService
    .post('/api/adapter/execute', {
      Method: { Method: 'POST' },
      Url: '/api/notification2/count-unchecked-notification2',
      Module: 'TEACHER',
      Data: `{}`,
      ContentType: 'application/json',
      AcceptType: 'application/json',
    })
    .subscribe((res: any) => {
      this.count_unchecked_notification = res.data;
    });
  }
}
