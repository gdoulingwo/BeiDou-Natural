<?php
/**
 * Author: zane
 * Date: 17-5-5
 */

Route::get('/log', 'FrontendController@log');

Route::get('/earlyWarning', function () {
    return view('frontend.earlyWarningApi');
});

Route::get('/planContent', 'admin\ContingencyPlanController@getPlan');