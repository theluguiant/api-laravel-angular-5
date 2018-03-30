import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [ UserService ]
})
export class RegisterComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public status_submit = true;
    public error;
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
    }

    ngOnInit(){
        console.log('registro cargado correctamente');
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
                            this.error.name =  null;
                            this.msn_success = response.msn;
                            form.reset();
                        break;
                    }
                    case 'error': {
                            this.status = response.status;
                            this.error = response.payload;
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