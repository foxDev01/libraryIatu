<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\DisciplineController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Authentication routes (login, register, logout, password reset) are
| registered by Laravel Fortify under the /api prefix. Routes in this file
| use Sanctum's stateful session authentication for the React SPA.
|
| Only safe methods (GET) are allowed for reads. Every state change uses
| POST, PUT or DELETE so it is protected by CSRF and cannot be triggered
| by a prefetch, crawler or link.
|
*/

Route::get('session', function (Request $request) {
    return response()->json([
        'authenticated' => $request->user() !== null,
    ]);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [UserController::class, 'me']);
    Route::get('groups', [GroupController::class, 'group_by_id']);
    Route::get('disciplines', [DisciplineController::class, 'disciplines']);
    Route::get('books', [BookController::class, 'book_by_group_id']);

    Route::get('questions', [QuestionController::class, 'index']);
    Route::post('questions', [QuestionController::class, 'store'])
        ->middleware('throttle:20,1');
    Route::put('questions/{id}', [QuestionController::class, 'update'])
        ->whereNumber('id')
        ->middleware('throttle:60,1');
    Route::delete('questions/{id}', [QuestionController::class, 'destroy'])
        ->whereNumber('id')
        ->middleware('throttle:20,1');
});
