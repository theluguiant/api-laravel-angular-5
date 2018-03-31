import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';
import { Token } from '../../models/token';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [ UserService ]
})
export class HomeComponent{
    public title: string;
    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Pagina de inicio';
    }


}