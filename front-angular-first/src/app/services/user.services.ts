import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './globals';
import { User } from '../models/user';
import { Params } from '@angular/router';

@Injectable()
export class UserService {
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        console.log(this.pruebas());
        this.url = GLOBAL.url;
    }

    pruebas(){
        return 'hola mundo';
    }

    registrarUser(user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register', params, {headers: headers});
    }
} 