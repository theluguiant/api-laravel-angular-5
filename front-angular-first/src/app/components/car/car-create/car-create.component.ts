import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.services';
import { Car } from '../../../models/car';
import { CarServices } from '../../../services/car.services';

@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css'],
  providers: [ UserService, CarServices ]
})
export class CarCreateComponent implements OnInit {
  public title_page;
  public identity;
  public token;
  public car: Car;
  public status;
  public msn_error;
  public msn_success;
  public status_submit = true;
  public error;
  public type;

  constructor(
    private _userService: UserService,
    private _carService: CarServices,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title_page = 'Formulario de registro de vehiculos';
    if (localStorage.getItem('token')) {
      this.identity = JSON.parse(localStorage.getItem('identity'));
      console.log(this.identity);
      this.token = localStorage.getItem('token');
    } else {
      this.identity = null;
      this.token = null;
    }
   }

  ngOnInit() {
    if ( !localStorage.getItem('token') && !this.identity.sub) {
      this._router.navigate(['login']);
    } else {
      this.car = new Car( '', '', '', '', '1');
    }
  }

  onSubmit(form) {
    if (localStorage.getItem('token')) {
       this._carService.create( this.token, this.car).subscribe(
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
                  this.error = response.payload;
                  this.type  = response.type;
                  this.status_submit  = true;
                  this.msn_error = response.msn;
                break;
               }
            }
          },
          error  => {
             console.log(<any>error);
          }
       );
    }
  }

}
