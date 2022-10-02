<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\General\Pages;

class PagesController extends Controller
{
    //
    public function index() {
        $data = Pages::all();

        return response()->json($data);
    }
}
