<?php

namespace App\Http\Resources;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Book
 */
class BookResource extends JsonResource
{
    /**
     * Публичное представление книги для SPA.
     *
     * Внутренние пути (file_path, cover_path) наружу не отдаём: файл идёт
     * через GET /api/books/{id}/download, обложка — через /api/books/{id}/cover,
     * оба эндпоинта проверяют группу.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'bookname' => $this->bookname,
            'link' => $this->link,
            'type_id' => $this->type_id,
            'has_file' => $this->hasFile(),
            'has_cover' => $this->hasCover(),
        ];
    }
}
