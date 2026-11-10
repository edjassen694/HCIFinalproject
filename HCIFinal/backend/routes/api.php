<?php

use App\Http\Controllers\Api\AiHealthController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\Api\StudentController;
use Illuminate\Support\Facades\Route;

// Health check endpoint
Route::get('/health', function () {
    return response()->json(['status' => 'healthy', 'timestamp' => now()]);
});

// Authentication & Profile
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);

    // Database health inspection and repair.
    Route::get('/ai/health', [AiHealthController::class, 'checkHealth']);
    Route::post('/ai/health/scan', [AiHealthController::class, 'checkHealth']);
    Route::post('/ai/health/fix', [AiHealthController::class, 'applyFix']);
    // Student, course, and section endpoints are available to signed-in users only.
    Route::apiResource('students', StudentController::class);
    Route::apiResource('courses', CourseController::class);
});

// Public reference data and aggregate counts used by the landing page.
Route::get('/stats', [StatsController::class, 'index']);
Route::get('/sections', [SectionController::class, 'index']);
