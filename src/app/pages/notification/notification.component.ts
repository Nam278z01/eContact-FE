import { Component, Injector, OnInit } from '@angular/core';
import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends Utils implements OnInit {

  notifications: any[];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.getMyNotification();
  }

  getMyNotification() {
    this._apiService
      .post('/api/adapter/execute', {
        Method: { Method: 'POST' },
        Url: '/api/notification2/get-my-notification2',
        Module: 'TEACHER',
        Data: `{"page":1,"pageSize":0}`,
        ContentType: 'application/json',
        AcceptType: 'application/json',
      })
      .subscribe((res: any) => {
        this.notifications = res.data;

        console.log(this.notifications)
      });
  }

}
