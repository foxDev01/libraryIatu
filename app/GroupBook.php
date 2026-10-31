<?php

namespace App;

use Database\Factories\GroupBookFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroupBook extends Model
{
    /** @use HasFactory<GroupBookFactory> */
    use HasFactory;

    protected $fillable = [
        'groupname_id',
        'book_id',
    ];

    /** @return BelongsTo<GroupName, $this> */
    public function groupname(): BelongsTo
    {
        return $this->belongsTo(GroupName::class, 'groupname_id');
    }

    /** @return BelongsTo<Book, $this> */
    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
