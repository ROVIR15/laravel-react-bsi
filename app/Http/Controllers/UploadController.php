<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\General\Upload;

class UploadController extends Controller
{
    //
	public function store(Request $request){
		$this->validate($request, [
			'file' => 'required',
		]);
 
		// menyimpan data file yang diupload ke variabel $file
		$file = $request->file('file');
 
      	// isi dengan nama folder tempat kemana file diupload
        $filename = time()."_".$file->getClientOriginalName();
		$tujuan_upload = 'data_file';

        Upload::create([
			'name' => $filename
		]);
 
        // upload file
		$file->move($tujuan_upload,$file->getClientOriginalName());

        return response()->json([
            'success' => true
        ]);
	}
}
