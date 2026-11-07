<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Http\Resources\DisciplineResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DisciplineController extends Controller
{
    /**
     * Return the disciplines assigned to the authenticated user's group.
     */
    public function disciplines(Request $request): JsonResponse
    {
        $group = $request->user()
            ->group()
            ->with('disciplines')
            ->first();

        if (! $group) {
            return response()->json([]);
        }

        return response()->json(
            DisciplineResource::collection($group->disciplines->values())->resolve($request)
        );
    }

    /**
     * Книги одной дисциплины, доступные учебной группе пользователя.
     *
     * Дисциплина должна быть закреплена за группой: иначе её книги всё равно
     * не скачать, поэтому чужой id неотличим от несуществующего (404).
     * Из книг дисциплины показываем только те, что закреплены за группой, —
     * ровно тот же набор, что доступен через GET /api/books.
     */
    public function books(Request $request, int $id): JsonResponse
    {
        $group = $request->user()
            ->group()
            ->with('groupname')
            ->first();

        $discipline = $group?->disciplines()->whereKey($id)->first();

        if ($discipline === null) {
            abort(404, 'Дисциплина не найдена.');
        }

        /** @var list<int|string> $groupBookIds */
        $groupBookIds = $group->groupname?->books()->pluck('books.id')->all() ?? [];

        $books = $discipline->books()
            ->with('type')
            ->whereKey($groupBookIds)
            ->orderBy('bookname')
            ->get();

        return response()->json([
            'discipline' => DisciplineResource::make($discipline)->resolve($request),
            'books' => BookResource::collection($books)->resolve($request),
        ]);
    }
}
