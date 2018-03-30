import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.services';
import { Token } from './models/token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
    public identity = null;
    public token;

    constructor(
      private _userService: UserService
    ) {
      if (localStorage.getItem('token')) {
          this.token = new Token(localStorage.getItem('token'));
          this._userService.getIdentity(this.token).subscribe(
              responseTwo => {
                  switch (responseTwo.status) {
                    case 'success': {
                      this.identity = responseTwo.payload;
                      console.log('success', this.identity);
                      break;
                    }
                    case 'error': {
                      console.log('error');
                      break;
                    }
                  }
              },
              error => {
                  console.log(<any>error);
              }
          );
      }
      console.log('login cargado correctamente');
 
    }
}
