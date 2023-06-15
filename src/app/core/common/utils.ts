import { Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from './../services/api.service';
import { environment } from 'src/environments/environment';
import { StorageService } from './../services/storage.service';
import { AuthService } from './../services/auth.service';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';

export class Utils {

  protected IMAGE_API: string;
  protected _apiService: ApiService;
  protected _storageService: StorageService;
  protected _authService: AuthService;
  protected _dataService: DataService;
  protected route: ActivatedRoute;
  protected router: Router;
  protected toastr: ToastrService;
  protected _location: Location;

  constructor(injector: Injector) {
    this.IMAGE_API = environment.BASE_API
    this._apiService = injector.get(ApiService);
    this._storageService = injector.get(StorageService);
    this._authService = injector.get(AuthService);
    this._dataService = injector.get(DataService);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.toastr = injector.get(ToastrService);
    this._location = injector.get(Location);
  }

  backClicked() {
    if (history.length <= 1) {
      // No history URL available
      // Perform alternative action or display a message
      this.router.navigate(['/']);
    } else {
      // Call the back() method to navigate back
      this._location.back();
    }
  }
}
