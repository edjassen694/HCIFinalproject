<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a paginated listing of students with search.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Student::query();

        if ($request->filled('search')) {
            $search = trim($request->query('search'));
            $query->where(function ($q) use ($search) {
                $q->where('student_id', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhereRaw("first_name || ' ' || last_name LIKE ?", ["%{$search}%"]);
            });
        }

        $perPage = (int) $request->query('per_page', 10);
        if ($perPage < 1 || $perPage > 100) {
            $perPage = 10;
        }

        $students = $query->orderBy('id', 'asc')->paginate($perPage);

        return response()->json($students);
    }

    /**
     * Store a newly created student.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|string|max:50|unique:students,student_id',
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|max:150|unique:students,email',
            'course'     => 'required|string|max:100',
            'section'    => 'required|string|max:50',
        ]);

        $student = Student::create($validated);

        return response()->json([
            'message' => 'Student record saved successfully.',
            'data'    => $student,
        ], 201);
    }

    /**
     * Display the specified student.
     */
    public function show(Student $student): JsonResponse
    {
        return response()->json([
            'data' => $student,
        ]);
    }

    /**
     * Update the specified student.
     */
    public function update(Request $request, Student $student): JsonResponse
    {
        $validated = $request->validate([
            'student_id' => 'required|string|max:50|unique:students,student_id,' . $student->id,
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|max:150|unique:students,email,' . $student->id,
            'course'     => 'required|string|max:100',
            'section'    => 'required|string|max:50',
        ]);

        $student->update($validated);

        return response()->json([
            'message' => 'Student record updated successfully.',
            'data'    => $student,
        ]);
    }

    /**
     * Remove the specified student.
     */
    public function destroy(Student $student): JsonResponse
    {
        $student->delete();

        return response()->json([
            'message' => 'Student record deleted successfully.',
        ]);
    }
}
