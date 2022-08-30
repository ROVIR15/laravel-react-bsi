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
    return redirect('/login');
});

// Route::view('/app/{path?}', 'app');
Route::view('/{path?}', 'dashboard')->where('path', '.*');
Route::view('/dashboard/{path?}', 'dashboard')->where('path', '.*');
// Auth::routes([
//   '/secret/register' => true,
//   '/secret/login' => false
// ]);

// Route::get('/secret/home', 'HomeController@index')->name('home');
