<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'username' => $user->username,
            'role' => 'Administrator',
        ];
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $validated['username'])
            ->orWhere('username', $validated['username'])
            ->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => 'Invalid username/email or password.'], 422);
        }

        $token = $user->createToken('student-ms-web')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $this->userPayload($user),
            'token' => $token,
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
            'username' => ['required', 'string', 'max:50', 'alpha_dash', 'unique:users,username'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        $user = User::create([
            'name' => trim($validated['first_name'].' '.$validated['last_name']),
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => $validated['password'],
        ]);
        $token = $user->createToken('student-ms-web')->plainTextToken;

        return response()->json([
            'message' => 'Account created successfully',
            'user' => $this->userPayload($user),
            'token' => $token,
        ], 201);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150', Rule::unique('users', 'email')->ignore($user->id)],
        ]);

        $user->update([
            'name' => trim($validated['first_name'].' '.$validated['last_name']),
            'email' => $validated['email'],
        ]);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $this->userPayload($user->fresh()),
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:8', 'different:current_password'],
        ]);

        if (!Hash::check($validated['current_password'], $user->password)) {
            return response()->json(['message' => 'The current password is incorrect.'], 422);
        }

        $user->update(['password' => $validated['new_password']]);
        $user->tokens()->delete();
        $token = $user->createToken('student-ms-web')->plainTextToken;

        return response()->json([
            'message' => 'Password updated successfully',
            'token' => $token,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();
        return response()->json(['message' => 'Signed out successfully.']);
    }
}
