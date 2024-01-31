<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book extends Model
{
    use HasFactory;

    // public function group()
    // {
    //   return $this->belongsTo(Group::class);
    // }
    // public function discipline()
    // {
    //   return $this->belongsToMany(Discipline::class);
    // }
    // public function groupname()
    // {
    //   return $this->belongsTo(GroupName::class);
    // }
    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class);
    }
}
