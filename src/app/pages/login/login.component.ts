import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Utils } from 'src/app/core/common/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Utils implements OnInit {
  loginForm: FormGroup;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      phone_number: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(value: any) {
    if (this.loginForm.valid) {
      this._authService.login(value.phone_number, value.password).subscribe(
        (res) => {
          this._storageService.setItem('CURRENT_USER', res);
          this.getStudent();
        },
        (error) => {
          this.toastr.error('Tài khoản hoặc mật khẩu không chính xác!');
        }
      );
    }
  }

  getStudent() {
    this._apiService
      .post('/api/adapter/execute', {
        Method: { Method: 'GET' },
        Url: '/api/subject-score/get-student-by-family',
        Module: 'TEACHER',
      })
      .subscribe((res: any) => {
        this._storageService.setItem('CURRENT_STUDENT', res.data[0]);
        this.router.navigate(['/']);
      });
  }
}
