<?php

namespace App\Http\Controllers;

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
            $group->disciplines->pluck('disciplinename')->values()
        );
    }
}
