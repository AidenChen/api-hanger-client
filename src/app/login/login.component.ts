import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Auth } from '../models/auth-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  auth: Auth;

  constructor(@Inject('auth') private service, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(formValue) {
    this.service
      .loginWithCredentials(formValue.login.username, formValue.login.password)
      .then(auth => {
        const redirectUrl = (auth.redirectUrl === null) ? '/' : auth.redirectUrl;
        if (!auth.hasError) {
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      });
  }

}
