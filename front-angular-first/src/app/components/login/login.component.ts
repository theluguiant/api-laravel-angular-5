import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
    public title: string;

    constructor(){
        this.title = 'Identificador';
    }

    ngOnInit(){
        console.log('login cargado correctamente');
    }
} 