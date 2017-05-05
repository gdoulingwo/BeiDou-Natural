<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function log()
    {
        return view('frontend.log');
    }
}
