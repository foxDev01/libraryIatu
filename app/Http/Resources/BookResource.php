<?php

namespace App\Http\Resources;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Book $resource
 * @property int $id
 * @property string $bookname
 * @property string $link
 */
class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array{id: int, bookname: string, link: string}
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'bookname' => $this->bookname,
            'link' => $this->link,
        ];
    }
}
