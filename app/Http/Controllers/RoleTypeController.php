<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Party\RoleType;

class RoleTypeController extends Controller
{
    public function index(Request $request)
    {
      $param = $request->has('type');
      $query = [];

      if($param){
        $query = RoleType::where('role', $request->query('type'))->get();
      } else {
        $query = RoleType::all();
      }

      return response()->json(['data' => $query]);
    }
}
