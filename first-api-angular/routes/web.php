<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/register','UserController@register');
Route::post('/api/login','UserController@login');
Route::get('/api/cars/{id}','CarController@show');
Route::post('/api/cars','CarController@store');
Route::post('/api/cars/{id}','CarController@update');
Route::post('/api/cars/destroy/{id}','CarController@destroy');
Route::post('/api/gettoken','CheckTokenController@getToken');
//Route::resource('/api/cars','CarController');