<?php

use App\Http\Controllers\InfomedMonitorController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('webmed_api', 'App\Http\Controllers\InfomedMonitorController');
// Route::post('/webmed_api', [InfomedMonitorController::class, 'store']);
// Route::post('/webmed_api/updemp', [InfomedMonitorController::class, 'update_emp']);
// Route::post('/webmed_api/updwork', [InfomedMonitorController::class, 'update_work']);
