<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
 */


Route::group(['prefix' => 'v1'], function () {
    Route::resource('/article', ArticlesController::class)->only('store', 'index', 'show', 'update', 'destroy');
    Route::resource('/category', CategoriesController::class)->only('store', 'index', 'show', 'update', 'destroy');
    Route::get('/ArticlesInCategory', [DashboardController::class, 'ArticlesInCategory']);
    Route::get('/TotalArticles', [DashboardController::class, 'TotalArticles']);
    Route::get('/TotalCategory', [DashboardController::class, 'TotalCategory']);
});
