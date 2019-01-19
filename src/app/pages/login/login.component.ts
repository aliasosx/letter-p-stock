import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/cores/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) {
    if (localStorage.getItem('abcd')) {
      _router.navigateByUrl('dashboard');
    }
  }
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }
  login() {

    if (this.loginForm) {
      this._auth.login(this.loginForm.get('username').value, this.loginForm.get('password').value).then((result) => {
        if (result['token']) {
          window.location.reload();
        }
      }).catch((err) => {
        alert('username of Password incorrect')
      });
    }
  }

}
