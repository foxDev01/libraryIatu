<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class GroupName extends Model
{
    use HasFactory;
    public function group()
    {
        return $this->belongsTo(Group::class);
    }
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
    public function groupbook()
    {
      return $this->belongsTo(GroupBook::class);
    }
}
