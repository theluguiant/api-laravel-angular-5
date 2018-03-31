import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.services';
import { Token } from './models/token';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
    public identity = null;
    public token;

    constructor(
      private _userService: UserService
    ) {
      if (localStorage.getItem('token')) {
        this.identity = JSON.parse(localStorage.getItem('identity'));
        this.token = localStorage.getItem('token');
      } else {
        this.identity = null;
        this.token = null;
      }
    }

    ngOnInit() {
      if (localStorage.getItem('token')) {
        this.identity = JSON.parse(localStorage.getItem('identity'));
        this.token = localStorage.getItem('token');
      } else {
        this.identity = null;
        this.token = null;
      }
    }

    ngDoCheck() {
      if (localStorage.getItem('token')) {
        this.identity = JSON.parse(localStorage.getItem('identity'));
        this.token = localStorage.getItem('token');
      } else {
        this.identity = null;
        this.token = null;
      }
    }
}
