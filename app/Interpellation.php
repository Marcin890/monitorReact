<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Interpellation extends Model
{
    protected $guarded = [];
    protected $table = 'interpellations';
    public $timestamps = false;
}