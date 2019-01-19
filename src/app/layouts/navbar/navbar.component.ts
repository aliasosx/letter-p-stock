import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/cores/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth: AuthService) {
    if (!localStorage.getItem('abcd')) {
      this.authNave = 'hidden';
    } else {
      this.authNave = '';
    }
  }
  authNave = '';
  ngOnInit() {

  }

}
