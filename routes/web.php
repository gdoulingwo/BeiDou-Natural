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

Route::get('/admin/contingencyPlan', 'admin\ContingencyPlanController@index');
Route::post('/admin/contingencyPlan', 'admin\ContingencyPlanController@store');
