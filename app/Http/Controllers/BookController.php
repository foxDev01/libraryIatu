<?php

namespace App\Http\Controllers;

use App\Book;
use App\Http\Resources\BookResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class BookController extends Controller
{
    /**
     * Return the books that are available for the authenticated user's group.
     */
    public function book_by_group_id(Request $request): JsonResponse
    {
        $group = $request->user()
            ->group()
            ->with('groupname.books')
            ->first();

        if ($group === null || $group->groupname === null) {
            return response()->json([]);
        }

        $books = BookResource::collection($group->groupname->books->values())->resolve($request);

        return response()->json($books);
    }

    /**
     * Отдать файл книги либо перенаправить на внешнюю ссылку.
     *
     * Скачивать можно только те книги, которые закреплены за учебной группой
     * пользователя, — файл лежит на приватном диске и напрямую недоступен.
     */
    public function download(Request $request, int $id): Response
    {
        $book = Book::query()->findOrFail($id);

        abort_unless($this->isAvailableForUser($book, $request), 403, 'Книга недоступна для вашей группы.');

        if ($book->hasFile()) {
            /** @var string $path */
            $path = $book->file_path;
            $disk = Storage::disk(Book::FILE_DISK);

            abort_unless($disk->exists($path), 404, 'Файл книги не найден на сервере.');

            return $disk->download($path, $book->downloadFileName());
        }

        if ($book->link !== null && $book->link !== '') {
            return redirect()->away($book->link);
        }

        return response()->json(['message' => 'У книги нет ни файла, ни ссылки.'], 404);
    }

    /**
     * Отдать обложку книги как inline-изображение.
     *
     * Тот же доступ, что и на файл книги: обложка лежит на приватном диске
     * и отдаётся только студентам её группы. Формат <img> в SPA подхватит
     * автоматически (cookie уходит тем же origin'ом).
     */
    public function cover(Request $request, int $id): Response
    {
        $book = Book::query()->findOrFail($id);

        abort_unless($this->isAvailableForUser($book, $request), 403, 'Книга недоступна для вашей группы.');
        abort_unless($book->hasCover(), 404, 'У книги нет обложки.');

        /** @var string $path */
        $path = $book->cover_path;
        $disk = Storage::disk(Book::FILE_DISK);

        abort_unless($disk->exists($path), 404, 'Файл обложки не найден на сервере.');

        return $disk->response($path, $book->coverFileName());
    }

    /**
     * Закреплена ли книга за учебной группой пользователя.
     */
    private function isAvailableForUser(Book $book, Request $request): bool
    {
        /** @var int|string|null $groupNameId */
        $groupNameId = $request->user()->group()->value('groupname_id');

        if ($groupNameId === null) {
            return false;
        }

        return $book->groupNames()->whereKey((int) $groupNameId)->exists();
    }
}
