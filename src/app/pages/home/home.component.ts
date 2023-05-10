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
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.user = JSON.parse(this._storageService.getItem('CURRENT_USER')!);
    this.student = JSON.parse(this._storageService.getItem('CURRENT_STUDENT')!);
  }
}
