<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DisciplineBook extends Model
{
    protected $fillable = [
        'discipline_id',
        'book_id',
    ];

    /** @return BelongsTo<Discipline, $this> */
    public function discipline(): BelongsTo
    {
        return $this->belongsTo(Discipline::class);
    }

    /** @return BelongsTo<Book, $this> */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
