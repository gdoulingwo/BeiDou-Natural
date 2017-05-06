<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\EarlyWarning;
use App\Meteorology;

class EarlyWarningController extends Controller
{
    public function index()
    {
        //$contingencyPlans = ContingencyPlan::all();
        return view('admin/warning');
    }

    public function store(Request $request)
    {
        $input = $request->all();
        EarlyWarning::create($input);

        return redirect('/admin/warning');
    }

    public function getWarning()
    {
        $meteorologies = Meteorology::all();
        $rains = EarlyWarning::where("key", "rain_fall")->get();
        $tempers = EarlyWarning::where("key", "temperature")->get();
        $array = array();
        $i = 1;
        foreach ($meteorologies as $meteorology) {
            foreach ($rains as $rain) {
                if ($meteorology->rain_fall > $rain->value) {
                    $array[$i]['id'] = $i;
                    $array[$i]['level'] = $rain->level;
                    $array[$i]['title'] = $rain->title;
                    $array[$i]['content'] = $rain->content;
                    $array[$i]['coordinate'] = [$meteorology->longitude, $meteorology->latitude];
                    $i++;
                    break;
                }
            }

            foreach ($tempers as $temper) {
                if ($meteorology->rain_fall > $temper->value) {
                    $array[$i]['id'] = $i;
                    $array[$i]['level'] = $temper->level;
                    $array[$i]['title'] = $temper->title;
                    $array[$i]['content'] = $temper->content;
                    $array[$i]['coordinate'] = [$meteorology->longitude, $meteorology->latitude];
                    $i++;
                    break;
                }
            }
        }
        header('Content-type: application/json');
        echo json_encode($array);
    }
}
