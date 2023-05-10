import { Component, Injector, OnInit } from '@angular/core';
import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent extends Utils implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['/login']);
  }

}
