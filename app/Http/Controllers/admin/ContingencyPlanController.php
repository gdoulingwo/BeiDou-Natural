<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ContingencyPlan;

class ContingencyPlanController extends Controller
{
    public function index()
    {
        $contingencyPlans = ContingencyPlan::all();
        return view('admin/contingencyPlan', compact('contingencyPlan'));
    }

    public function store(Request $request)
    {
        $input = $request->all();
        ContingencyPlan::create($input);

        return redirect('/admin/plan');
    }

    public function getPlan(Request $request)
    {
        //$affected_population = $request->affected_population;
        $dead_population = $request->dead_population;
        //$building_collapse = $request->building_collapse;
        $array = array();
        $plans=ContingencyPlan::orderBy('dead_population')->get();
        foreach ($plans as $plan){
            if($dead_population>$plan->dead_population){
                $array['name']=$plan->name;
                $array['content']=$plan->content;
                break;
            }
        }

        return response()->json($array);    //转换成json，发送
    }
}
