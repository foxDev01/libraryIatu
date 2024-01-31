<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discipline extends Model
{
    use HasFactory;
    // public function book()
    // {
    //   return $this->belongsToMany(Book::class);
    // }
    public function group()
    {
      return $this->belongsToMany(Group::class);
    }
}
