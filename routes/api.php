<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\DisciplineController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\GroupNameController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Authentication routes (login, register, logout, password reset) are
| registered manually so that we can apply rate limiting: login has its own
| Fortify limiter (5 attempts per email and IP), registration is limited to
| 5 IP-based requests per minute and password reset endpoints to 6 per minute.
| All other routes use Sanctum's stateful session authentication for the
| React SPA.
|
| Only safe methods (GET) are allowed for reads. Every state change uses
| POST, PUT or DELETE so it is protected by CSRF and cannot be triggered
| by a prefetch, crawler or link.
|
*/

Route::post('login', [AuthenticatedSessionController::class, 'store']);
Route::post('register', [RegisteredUserController::class, 'store'])
    ->middleware('throttle:register');
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');

// Восстановление пароля: запрос ссылки и установка нового пароля.
Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('throttle:6,1');
Route::post('reset-password', [NewPasswordController::class, 'store'])
    ->middleware('throttle:6,1');

// Public list of group names for the registration form.
Route::get('group-names', [GroupNameController::class, 'index']);

Route::get('session', function (Request $request) {
    return response()->json([
        'authenticated' => $request->user() !== null,
    ]);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [UserController::class, 'me']);
    Route::get('groups', [GroupController::class, 'group_by_id']);
    Route::get('disciplines', [DisciplineController::class, 'disciplines']);
    Route::get('disciplines/{id}/books', [DisciplineController::class, 'books'])
        ->whereNumber('id')
        ->middleware('throttle:60,1');
    Route::get('books', [BookController::class, 'book_by_group_id']);
    Route::get('books/{id}/download', [BookController::class, 'download'])
        ->whereNumber('id')
        ->middleware('throttle:60,1');
    Route::get('books/{id}/cover', [BookController::class, 'cover'])
        ->whereNumber('id')
        ->middleware('throttle:60,1');

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
