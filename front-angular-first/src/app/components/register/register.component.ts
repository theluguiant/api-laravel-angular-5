import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';
import { ErrorRegister } from '../../models/erroregister';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [ UserService ]
})
export class RegisterComponent implements OnInit{
    public title: string;
    public user: User;
    public errorRegister: ErrorRegister;
    public status: string;
    public status_submit = true;
    public error = [];
    public msn_success;
    public msn_error;
    public type;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Registro';
        this.user = new User( '', '' , '', '');
        this.errorRegister = new ErrorRegister( '', '', '', '');
    }

    ngOnInit() {
        if (localStorage.getItem('token')) {
            this._router.navigate(['']);
        }
    }

    onSubmit(form){
        /*console.log(this);
        console.log(this._userService.pruebas());*/
        this.status_submit  = false;
        this._userService.registrarUser(this.user).subscribe(
            response => {

                switch (response.status) {
                    case 'success': {
                            this.status = response.status;
                            this.status_submit  = true;
                            this.error = [];
                            this.msn_success = response.msn;
                            form.reset();
                        break;
                    }
                    case 'error': {
                            this.status = response.status;
                            this.errorRegister = response.payload;
                            this.type  = response.type;
                            this.status_submit  = true;
                            this.msn_error = response.msn;
                            console.log(response);
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