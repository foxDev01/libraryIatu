<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Return the authenticated user's display name.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user()->name);
    }
}
