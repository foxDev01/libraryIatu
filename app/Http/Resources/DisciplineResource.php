<?php

namespace App\Http\Resources;

use App\Discipline;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Discipline
 */
class DisciplineResource extends JsonResource
{
    /**
     * Публичное представление дисциплины для SPA.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'disciplinename' => $this->disciplinename,
        ];
    }
}
