<?php

namespace App\Http\Resources;

use App\Discipline;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Discipline $resource
 * @property int $id
 * @property string $disciplinename
 */
class DisciplineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array{id: int, disciplinename: string}
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'disciplinename' => $this->disciplinename,
        ];
    }
}
