<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * Return the name of the authenticated user's group.
     */
    public function group_by_id(Request $request): JsonResponse
    {
        $group = $request->user()
            ->group()
            ->with('groupname')
            ->first();

        return response()->json([
            'groupname' => $group?->groupname?->groupname,
        ]);
    }
}
