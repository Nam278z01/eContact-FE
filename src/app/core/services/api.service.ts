import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../entities/user';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  user: any;
  host = environment.BASE_API;

  constructor(private _http: HttpClient, private _authService: AuthService) {
  }

  get<T>(url: string, params: any = {}, withToken: boolean = true) {

    let header: any = {}
    header['Content-Type'] = 'application/json';

    if (withToken) {
      this.user = this._authService.getLoggedInUser();
      header['Authorization'] = `Bearer ${this.user?.access_token}`;
    }

    let options: any = {
      headers: new HttpHeaders(header),
      params: this.getHttpParams(params)
    }

    return this._http.get<T>(this.host + url, options );
  }

  post(url: string, body: any, params: any = {}, withToken: boolean = true) {
    let header: any = {}
    header['Content-Type'] = 'application/json';

    if (withToken) {
      this.user = this._authService.getLoggedInUser();
      header['Authorization'] = `Bearer ${this.user?.access_token}`;
    }

    let options: any = {
      headers: new HttpHeaders(header),
      params: this.getHttpParams(params),
    }

    return this._http
      .post<any>(this.host + url, body, options)
  }

  getHttpParams(params : any) : HttpParams {
    let httpParams : HttpParams  = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.append(key , params[key]);
      }
    });
     return httpParams;
   }
}
