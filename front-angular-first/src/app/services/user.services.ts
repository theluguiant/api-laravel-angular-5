import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './globals';
import { User } from '../models/user';
import { Params } from '@angular/router';

@Injectable()
export class UserService {
    public url: string;
    public token;

    constructor(
        public _http: HttpClient
    ) {
        console.log(this.pruebas());
        this.url = GLOBAL.url;
    }

    pruebas() {
        return 'hola mundo';
    }

    registrarUser(user): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'register', params, {headers: headers});
    }

    signup (user, gettoken = null ): Observable<any> {
        if (gettoken !== null) {
            user.gettoken = 'true';
        }
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url + 'login', params, {headers: headers});
    }

    getIdentity(token): Observable<any> {
        if (localStorage.getItem('token')) {
            console.log('peticion', token);
            let json = JSON.stringify(token);
            let params = 'json=' + json;
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.post(this.url + 'gettoken', params, {headers: headers});
        } else {
            return null;
        }
    }

    getToken() {
        if (localStorage.getItem('token')) {
            this.token = JSON.parse(localStorage.getItem('token'));
        } else {
            this.token = null;
        }
        return this.token;
    }

}
