<?php
/**
 * Author: zane
 * Date: 17-5-5
 */

Route::get('/log', 'FrontendController@log');

Route::get('/api', function () {
    return view('frontend.api');
});