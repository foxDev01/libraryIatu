<?php

namespace App;

use Database\Factories\BookFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    /** @use HasFactory<BookFactory> */
    use HasFactory;

    protected $fillable = [
        'bookname',
        'link',
        'type_id',
    ];

    /** @return BelongsTo<Type, $this> */
    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    /** @return BelongsToMany<Discipline, $this> */
    public function disciplines(): BelongsToMany
    {
        return $this->belongsToMany(Discipline::class, 'discipline_books', 'book_id', 'discipline_id')
            ->withTimestamps();
    }

    /** @return BelongsToMany<GroupName, $this> */
    public function groupNames(): BelongsToMany
    {
        return $this->belongsToMany(GroupName::class, 'group_books', 'book_id', 'groupname_id')
            ->withTimestamps();
    }
}
