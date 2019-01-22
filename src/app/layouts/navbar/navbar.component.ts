import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/cores/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) {
    if (!localStorage.getItem('abcd')) {
      this.authNave = 'hidden';
    } else {
      this.authNave = '';
      this._auth.tokenVerify(localStorage.getItem('abcd')).then((res) => {
        if (!res) {
          _router.navigateByUrl('login');
        } else {
          return
        }
      });
    }
  }
  authNave = '';
  ngOnInit() {

  }

}
