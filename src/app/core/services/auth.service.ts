import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

import { StorageService } from './storage.service';
import { User } from '../entities/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host: string = environment.BASE_API;

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService,
    private router: Router
  ) {}

  login(username: string, password: string) {
    let body =
      'facility_id=' +
      encodeURIComponent('00000000-0000-8000-0000-000000000000') +
      '&userName=' +
      encodeURIComponent(username) +
      '&password=' +
      encodeURIComponent(Md5.hashStr(password).toString()) +
      '&grant_type=password';

    let header: any = {};
    header['Content-Type'] = 'application/x-www-form-urlencoded';

    let options: any = {
      headers: new HttpHeaders(header),
    };

    return this._http.post<any>(this.host + '/api/token', body, options);
  }

  logout() {
    if (this.isAuthenticated()) {
      let header: any = {};
      header['Authorization'] = `Bearer  ${
        this.getLoggedInUser()?.access_token
      }`;

      let options: any = {
        headers: new HttpHeaders(header),
      };
      this.router.navigate(['/login']);
      this.clearUserStorage();
      this._http
        .post(this.host + '/api/system/logout', JSON.stringify({}), options)
        .subscribe((res) => {});
    } else {
      this.clearUserStorage();
    }
  }

  isAuthenticated(): boolean {
    if (this._storageService.getItem('CURRENT_USER') != null) {
      return true;
    } else {
      return false;
    }
  }

  clearUserStorage() {
    this._storageService.removeItem('CURRENT_USER');
    this._storageService.removeItem('CURRENT_STUDENT');
  }

  getLoggedInUser(): any {
    let user: User | null;
    if (this.isAuthenticated()) {
      let userData: any = JSON.parse(
        this._storageService.getItem('CURRENT_USER') ?? '{}'
      );
      return userData;
    } else {
      user = null;
    }
    return user;
  }
}
