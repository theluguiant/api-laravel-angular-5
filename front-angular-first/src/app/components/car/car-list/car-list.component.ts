import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { CarServices } from '../../../services/car.services';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  providers: [CarServices]
})
export class CarListComponent implements OnInit {
  public title: string;
  public allCars;
  public status;
  public error_type;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _car: CarServices
  ) { 
    this.title = 'Listado de vehiculos';
  }

  ngOnInit() {
    this.getCars();
  }

  getCars(){
    this._car.listCars().subscribe(
      response => {
        switch (response.status) {
          case 'success': {
             this.allCars = response.payload;
             this.status = response.status;
             this.error_type = null;
             this._router.navigate(['cars']);
           break;
          }

          case 'error': {
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

  delete(id){
    if(localStorage.getItem('token')){
      let token = localStorage.getItem('token');
      this._route.params.subscribe(
        params => {
        this._car.destroy(token, id).subscribe(
           response =>{
              switch (response.status) {
                case 'success': {
                  this.status = response.status;
                  this.getCars();
                  this.error_type = null;
                break;
                }
    
                case 'error': {
                  console.log(response);
                break;
                }
              }
           },
           error => {
              console.log(<any>error);
           }
        );
      });
    }
  }

}
