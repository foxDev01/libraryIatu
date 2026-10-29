<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

        if (! $group || ! $group->groupname) {
            return response()->json([]);
        }

        return response()->json($group->groupname->books->values());
    }
}
