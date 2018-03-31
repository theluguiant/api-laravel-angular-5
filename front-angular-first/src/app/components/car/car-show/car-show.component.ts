import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Car } from '../../../models/car';
import { CarServices } from '../../../services/car.services';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.services';

@Component({
  selector: 'app-car-show',
  templateUrl: './car-show.component.html',
  styleUrls: ['./car-show.component.css'],
  providers: [UserService, CarServices]
})
export class CarShowComponent implements OnInit {
  public title_page: string;
  public status_page: string;
  public car: Car;
  public id: string;
  
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _carService: CarServices
  ) {
    this.title_page = 'Detalle de vehiculo';
   }

  ngOnInit() {
    this.getCar();
  }

  getCar(){
    this._route.params.subscribe(
      params => {
        this.id = params['internal'];
      }
    );
    if(this.id){
      this._carService.getCar(this.id).subscribe(
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
          console.log('payload', response.payload);
          console.log('status', response.status);
          console.log('car', this.car);
        },
        error => {
          console.log(<any>error);
        }
      );
    }
    
  }

}
