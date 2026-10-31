<?php

namespace App\Http\Controllers;

use App\GroupName;
use Illuminate\Http\JsonResponse;

class GroupNameController extends Controller
{
    /**
     * List the study groups a new user can pick during registration.
     */
    public function index(): JsonResponse
    {
        $groupNames = GroupName::query()
            ->whereNotNull('groupname')
            ->orderBy('groupname')
            ->get(['id', 'groupname'])
            ->unique('groupname')
            ->values();

        return response()->json($groupNames);
    }
}
