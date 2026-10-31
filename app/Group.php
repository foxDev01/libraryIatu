<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Group extends Model
{
    protected $fillable = [
        'groupname_id',
        'user_id',
        'direction_id',
    ];

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return BelongsTo<Direction, $this> */
    public function direction(): BelongsTo
    {
        return $this->belongsTo(Direction::class);
    }

    /** @return BelongsTo<GroupName, $this> */
    public function groupname(): BelongsTo
    {
        return $this->belongsTo(GroupName::class, 'groupname_id');
    }

    /** @return BelongsToMany<Discipline, $this> */
    public function disciplines(): BelongsToMany
    {
        return $this->belongsToMany(Discipline::class, 'group_disciplines', 'group_id', 'discipline_id')
            ->withTimestamps();
    }
}
