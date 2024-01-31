<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupDiscipline extends Model
{
    use HasFactory;
    public function discipline()
            {
                return $this->hasMany(Book::class);
            }

}
