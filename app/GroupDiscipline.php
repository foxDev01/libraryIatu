<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroupDiscipline extends Model
{
    protected $fillable = [
        'group_id',
        'discipline_id',
    ];

    /** @return BelongsTo<Group, $this> */
    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }

    /** @return BelongsTo<Discipline, $this> */
    public function discipline(): BelongsTo
    {
        return $this->belongsTo(Discipline::class);
    }
}
