import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';
import { Token } from '../../models/token';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [ UserService ]
})
export class LoginComponent implements OnInit{
    public title: string;
    public user: User;
    public status_submit = true;
    public token;
    public identity;
    public checkToken;
    public error;
    public status;
    public msn_error;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Identificador';
        this.user  = new User( '', '', '', '');
    }

    ngOnInit(){
        if (localStorage.getItem('token')) {
            this.token = new Token(localStorage.getItem('token'));
            this._router.navigate(['']);
        }
        this.logout();
    }

    onSubmit(form){
        this.status_submit  = false;
        this._userService.signup(this.user).subscribe(
            response => {
                console.log('login', response);
                switch (response.status) {
                    case 'success': {
                        if (response.payload.token.status === 'error') {
                            this.msn_error = response.payload.token.message;
                            this.status_submit  = true;
                            this.status = response.payload.token.status; 
                            this.error = null;
                        } else {
                            this.status_submit = true;
                            this.status = response.status;
                            this.token = response.payload.token;
                            this.error = null;
                            localStorage.setItem('token', this.token);
                            let token = new Token(localStorage.getItem('token'));
                            this._userService.getIdentity(token).subscribe(
                                responseTwo => {
                                  switch (responseTwo.status) {
                                    case 'success': {
                                        this.identity = responseTwo.payload;
                                        console.log(this.identity.name);
                                        localStorage.setItem('identity', JSON.stringify(this.identity));
                                        break;
                                    }
                                    case 'error': {
                                      localStorage.removeItem('token');
                                      localStorage.removeItem('identity');
                                      this.identity = null;
                                      this.token = null;
                                      token = null;
                                      break;
                                    }
                                  }
                                },
                                error => {
                                    console.log(<any>error);
                                }
                            );
                            this._router.navigate(['']);
                        }
                        break;
                    }
                    case 'error': {
                        this.msn_error = response.msn;
                        this.status_submit  = true;
                        this.status = response.status; 
                        this.error = response.payload;
                        break;
                    }
                    default: {
                        this.status_submit  = true;
                        break;
                    }

                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    logout() {
        this._route.params.subscribe(params => {
            let logout = +params['sure'];
            if (logout === 1) {
                localStorage.removeItem('token');
                localStorage.removeItem('identity');
                this.token = null;
                this.identity = null;
                this._router.navigate(['']);
            }
        });
    }
}
