<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type extends Model
{
    use HasFactory;

    protected $fillable = [
        'typenames',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'type_id');
    }
}
