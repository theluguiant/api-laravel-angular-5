import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarCreateComponent } from './components/car/car-create/car-create.component';
import { CarEditComponent } from './components/car/car-edit/car-edit.component';
import { CarShowComponent } from './components/car/car-show/car-show.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'cars', component: CarListComponent},
    {path: 'car-show/:id', component: CarShowComponent},
    {path: 'car-edit/:id', component: CarEditComponent},
    {path: 'car-create', component: CarCreateComponent},
    {path: '**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
