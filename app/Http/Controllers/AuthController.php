<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Login and request access token
     */
    public function login(Request $request)
    {
        $loginValidator = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($loginValidator)) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid credentials'
            ], 401);
        }

        $accessToken = Auth::user()->createToken('auth-token')->accessToken;

        return response()->json([
            'success' => true,
            'access_token' => $accessToken
        ]);
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->token()->revoke();
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => 'Server problem when trying to revoke token'
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 200);
    }
}
