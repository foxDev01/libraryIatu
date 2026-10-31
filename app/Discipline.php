<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Discipline extends Model
{
    protected $fillable = [
        'disciplinename',
    ];

    /** @return BelongsToMany<Group, $this> */
    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class, 'group_disciplines', 'discipline_id', 'group_id')
            ->withTimestamps();
    }

    /** @return BelongsToMany<Book, $this> */
    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'discipline_books', 'discipline_id', 'book_id')
            ->withTimestamps();
    }
}
