import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/cores/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) {
    if (!localStorage.getItem('abcd')) {
      _router.navigateByUrl('');
    } else {
      this._auth.tokenVerify(localStorage.getItem('abcd')).then((res) => {
        if (!res) {
          _router.navigateByUrl('');
        } else {
          return
        }
      });
    }
  }

  ngOnInit() {
  }
}
