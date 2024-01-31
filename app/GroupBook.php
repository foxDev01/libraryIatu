<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupBook extends Model
{
    use HasFactory;
    public function groupname()
            {
                return $this->belongsTo(GroupName::class);
            }
    public function book()
            {
            return $this->belongsTo(Book::class);
            }
}
