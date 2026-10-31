<?php

namespace App\Http\Resources;

use App\Question;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Question $resource
 * @property int $id
 * @property string $title
 * @property string $content
 */
class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array{id: int, title: string, content: string}
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
        ];
    }
}
