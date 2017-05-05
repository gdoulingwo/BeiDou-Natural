<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ContingencyPlan;

class ContingencyPlanController extends Controller
{
    public function index()
    {
        return view('admin/contingencyPlan');
    }

    public function store(Request $request)
    {
        $input = $request->all();
        ContingencyPlan::create($input);

        return redirect('/admin/contingencyPlan');
    }
}
