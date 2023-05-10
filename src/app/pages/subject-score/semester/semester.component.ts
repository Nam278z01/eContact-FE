import { Component, Injector, OnInit } from '@angular/core';
import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.scss']
})
export class SemesterComponent extends Utils implements OnInit {

  academy_year: any;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.academy_year = this.route.snapshot.paramMap.get('academy_year');
  }

}
