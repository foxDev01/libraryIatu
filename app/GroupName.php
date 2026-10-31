<?php

namespace App;

use Database\Factories\GroupNameFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GroupName extends Model
{
    /** @use HasFactory<GroupNameFactory> */
    use HasFactory;

    protected $fillable = [
        'groupname',
    ];

    /** @return HasMany<Group, $this> */
    public function groups(): HasMany
    {
        return $this->hasMany(Group::class, 'groupname_id');
    }

    /** @return BelongsToMany<Book, $this> */
    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'group_books', 'groupname_id', 'book_id')
            ->withTimestamps();
    }
}
