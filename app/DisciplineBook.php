<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisciplineBook extends Model
{
    use HasFactory;
    
    public function book()
            {
                return $this->hasMany(Book::class);
            }
    public function discipline()
            {
                return $this->hasMany(Discipline::class);
            }
}
