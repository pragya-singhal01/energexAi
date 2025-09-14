<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()->all()], 400);
        }

        // Save new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json(['success' => true, 'user' => $user], 201); // 201 Successfully Created
    }

    public function login(Request $request)
    {
        $rules = [
            'email.required' => 'Email can not be empty.',
            'password.required' => 'Password can not be empty.'
        ];
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ], $rules);

        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(['success' => false, 'errors' => $errors], 400);
        }

        $credentials = $request->only("email", "password");
        $token = null;

        /**
         * Validate the credentials using JWT, 
         * if JWT returns the token, user is authorized
         * if not, send unauthorized code
         */
        if (!($token = JWTAuth::attempt($credentials))) {
            return response()->json(['success' => false, 'errors' => 'Invalid credentials'], 401);
        }

        // User authorized
        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => auth()->user()
        ], 200);
    }
}
