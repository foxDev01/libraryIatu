<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Direction extends Model
{
    use HasFactory;
    public function group(): HasOne
            {
                return $this->HasOne(Group::class);
            }
}
