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

Route::view('/app/{path?}', 'app');
Route::view('/auth/{path?}', 'dashboard')->where('path', '.*');
Route::view('/dashboard/{path?}', 'dashboard')->where('path', '.*');
// Auth::routes([
//   'register' => false,
//   'login' => false
// ]);

Route::get('/home', 'HomeController@index')->name('home');
