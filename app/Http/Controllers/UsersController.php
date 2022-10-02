<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{
    //
    public function index() {
        $data = User::all();

        return response()->json($data);
    }

    public function show($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }
}
