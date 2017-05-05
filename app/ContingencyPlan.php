<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContingencyPlan extends Model
{
    protected $fillable = [
        'name', 'affected_population', 'dead_population','building_collapse',
    ];
}
