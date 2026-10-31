<?php

namespace App;

use Database\Factories\TypeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type extends Model
{
    /** @use HasFactory<TypeFactory> */
    use HasFactory;

    protected $fillable = [
        'typenames',
    ];

    /** @return HasMany<Book, $this> */
    public function books(): HasMany
    {
        return $this->hasMany(Book::class, 'type_id');
    }
}
