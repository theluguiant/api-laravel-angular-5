import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
