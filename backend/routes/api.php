<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FundController;
use App\Http\Controllers\Api\ExpenseController;

// Public Routes
Route::get('/dashboard', [PublicController::class, 'getDashboardData']);
Route::get('/public/funds/{id}', [FundController::class, 'getPublicStudents']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Fund Management
    Route::get('/funds', [FundController::class, 'index']);
    Route::post('/funds/weekly', [FundController::class, 'createWeekly']);
    Route::get('/funds/{id}', [FundController::class, 'show']);
    Route::post('/funds/{id}/contribute/{userId}', [FundController::class, 'contribute']);

    // Expense Management
    Route::get('/expenses', [ExpenseController::class, 'index']);
    Route::post('/expenses', [ExpenseController::class, 'store']);
    Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);
});
