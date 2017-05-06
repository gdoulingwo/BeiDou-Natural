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
require __DIR__ . "/frontend.php";

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/plan', 'admin\ContingencyPlanController@index');
Route::post('/admin/plan', 'admin\ContingencyPlanController@store');

Route::get('/admin/warning', 'admin\EarlyWarningController@index');
Route::post('/admin/warning', 'admin\EarlyWarningController@store');