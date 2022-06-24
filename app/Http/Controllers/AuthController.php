<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\User;

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
        $user = User::where('id', Auth::user()->id)->with('pages')->first();

        return response()->json([
            'data' => [
              'success' => true,
              'access_token' => $accessToken,
              'user' => $user  
            ]
        ], 200);
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
