<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\DisciplineController;
use App\Http\Controllers\GroupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['web']], function () {
    //

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
    ->middleware(['guest'])
    ->name('login');

$limiter = config('fortify.limiters.login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(array_filter([
        'guest',
        $limiter ? 'throttle:' . $limiter : null,
    ]));

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

    //
Route::get('/register', [RegisteredUserController::class, 'create'])
    ->middleware(['guest'])
    ->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware(['guest']);
    //

Route::middleware('auth:sanctum')->group(function () {
    Route::get('questions', [QuestionController::class, 'childrens_by_id']);
    Route::get('groups', [GroupController::class, 'group_by_id']);

    Route::get('questions/create', [QuestionController::class, 'create']);
    Route::post('/questions/update', [QuestionController::class, 'update']);
    Route::get('questions/delete/{id}', [QuestionController::class, 'destroy']);
    
    Route::get('books', [BookController::class, 'book_by_group_id']);
    Route::get('user', [UserController::class, 'me']);
    Route::get('disciplines', [DisciplineController::class, 'disciplines']);
});

});
    