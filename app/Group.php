<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\Cast\Bool_;

class Group extends Model
{
    use HasFactory;
    public function user()
    {
      return $this->belongsTo(User::class);
    }
    public function direction()
    {
      return $this->belongsTo(Direction::class);
    }
    // public function book()
    // {
    //   return $this->hasMany(Book::class);
    // }
    public function discipline()
    {
      return $this->belongsToMany(Discipline::class);
    }
    public function groupname()
    {
      return $this->belongsTo(GroupName::class);
    }
}
