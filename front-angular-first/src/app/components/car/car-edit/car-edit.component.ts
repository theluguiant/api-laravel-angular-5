import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Car } from '../../../models/car';
import { CarServices } from '../../../services/car.services';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.services';


@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
  providers: [UserService, CarServices]
})
export class CarEditComponent implements OnInit {
  public title_page: string;
  public status_page: string;
  public car: Car;
  public status_submit = true;
  public error;
  public status;
  public msn_success;
  public msn_error;

  constructor( private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _carService: CarServices) { 
      this.title_page = 'Detalle de vehiculo';
      this.car = new Car( '', '', '', '', '' );
    }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.getCar();
    } else {
      this._router.navigate(['']);
    }
  }

  getCar(){
    this._route.params.subscribe(
      params => {
        let id = params['internal'];
        this._carService.getCar(id).subscribe(
          response => {
              switch (response.status) {
                    case 'success': {
                      this.status_page = response.status;
                      this.car = response.payload; 
                  break;
              }
              case 'error': {
                      this.status_page = response.status;
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
    );
  }

  onSubmit(form) {
    if (localStorage.getItem('token')) {
        this.status_submit = false;
        let token = localStorage.getItem('token');
        this._carService.updateCar(token, this.car).subscribe(
          response => {
            console.log(response);
            switch (response.status) {
                case 'success': {
                    this.status = response.status;
                    this.msn_success = response.msn;
                    this.error = null;
                    this.status_submit = true;
                break;
                }
                case 'error': {
                      this.status_submit = true;
                      this.status = response.status;
                      this.msn_error = response.msn;
                      console.log('error', this.msn_error);
                      this.error   = response.payload;
                    break;
                }
            }    
          }, error => {
            console.log(<any>error);
          }
        );
    }
  }

}
