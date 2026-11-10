<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * List courses with optional search by code or name.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Course::query();

        if ($request->filled('search')) {
            $search = trim($request->query('search'));
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%");
            });
        }

        $courses = $query->orderBy('id', 'asc')->get();

        return response()->json([
            'data' => $courses,
        ]);
    }

    /**
     * Store a newly created course.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code'     => 'required|string|max:20|unique:courses,code',
            'name'     => 'required|string|max:255',
            'sections' => 'nullable|string|max:100',
        ]);

        if (empty($validated['sections'])) {
            $validated['sections'] = 'BSIT 1A–4D';
        }

        $course = Course::create($validated);

        return response()->json([
            'message' => 'Course created successfully.',
            'data'    => $course,
        ], 201);
    }

    /**
     * Display the specified course.
     */
    public function show(Course $course): JsonResponse
    {
        return response()->json([
            'data' => $course,
        ]);
    }

    /**
     * Update the specified course.
     */
    public function update(Request $request, Course $course): JsonResponse
    {
        $validated = $request->validate([
            'code'     => 'required|string|max:20|unique:courses,code,' . $course->id,
            'name'     => 'required|string|max:255',
            'sections' => 'nullable|string|max:100',
        ]);

        $course->update($validated);

        return response()->json([
            'message' => 'Course updated successfully.',
            'data'    => $course,
        ]);
    }

    /**
     * Remove the specified course.
     */
    public function destroy(Course $course): JsonResponse
    {
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully.',
        ]);
    }
}
