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
        }
        console.log('login cargado correctamente');
    }

    onSubmit(form){
        this.status_submit  = false;
        this._userService.signup(this.user).subscribe(
            response => {
                switch (response.status) {
                    case 'success': {
                        this.status_submit = true;
                        console.log('con token false', response);
                        this.token = response.payload.token;
                        localStorage.setItem('token', this.token);
                        break;
                    }
                    case 'error': {
                        this.status_submit  = true;
                        break;
                    }
                    default: {
                        this.status_submit  = true;
                        console.log(response);
                        break;
                    }

                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
} 