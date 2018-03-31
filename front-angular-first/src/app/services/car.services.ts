import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './globals';
import { Params } from '@angular/router';
import { Car } from '../models/car';

@Injectable()
export class CarServices {
    public url: string;
    public token;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    listCars(): Observable<any> {
        if (localStorage.getItem('token')) {
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                           .set('Authorization', localStorage.getItem('token') );
            return this._http.post(this.url + 'cars/list', null, {headers: headers});
        }
    }
}
