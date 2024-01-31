<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Question extends Model
{
    use HasFactory;
    public function user() : BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    protected $fillable = [
        'title',
        'content',
        'user_id'
    ];
}
