<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroupBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'groupname_id',
        'book_id',
    ];

    public function groupname(): BelongsTo
    {
        return $this->belongsTo(GroupName::class, 'groupname_id');
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
