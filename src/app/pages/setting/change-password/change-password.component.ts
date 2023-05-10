import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/core/common/utils';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends Utils implements OnInit {

  changePasswordForm: FormGroup;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(value: any) {
    if (this.changePasswordForm.valid) {
      if (value.new_password == value.confirm_password) {

        let user: any = {};
        user.password = Md5.hashStr(value.password).toString();
        user.new_password = Md5.hashStr(value.new_password).toString();
        this._apiService.post('/api/user/change-password', user).subscribe(res => {
          this.toastr.success('Đổi mật khẩu thành công!')
        });
      }
    }
  }

}
