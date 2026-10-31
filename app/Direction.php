<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Direction extends Model
{
    protected $fillable = [
        'directionname',
    ];

    /** @return HasMany<Group, $this> */
    public function groups(): HasMany
    {
        return $this->hasMany(Group::class);
    }
}
