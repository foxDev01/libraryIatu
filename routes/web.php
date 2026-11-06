<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| The React single-page application handles all non-API routes. The API,
| Sanctum and health-check endpoints are excluded from the catch-all.
|
*/

// /api, /sanctum, /up и /storage (подписанные ссылки на приватные файлы)
// попадают к своим маршрутам, всё остальное — SPA.
Route::get('/{query?}', function () {
    return view('app');
})->where('query', '^(?!api|sanctum|up|_ignition|storage).*$');
