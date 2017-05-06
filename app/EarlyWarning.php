<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EarlyWarning extends Model
{
    protected $fillable = [
        'title', 'content', 'key','value','level'
    ];
}
