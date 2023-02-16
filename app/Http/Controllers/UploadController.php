<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\General\Upload;
use Illuminate\Support\Facades\Storage;

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

		$path = '/data_file/'.$file->getClientOriginalName();

        return response()->json([
            'success' => true,
			'path' => $path
        ]);
	}

	public function upload_shipment_receipt(Request $request){
		$this->validate($request, [
			'file' => 'required',
		]);
 
		// menyimpan data file yang diupload ke variabel $file
		$file = $request->file('file');
 
    // isi dengan nama folder tempat kemana file diupload
    $filename = time()."_".$file->getClientOriginalName();
		$tujuan_upload = 'shipment_receipt';

    Upload::create([
			'name' => $filename
		]);
 
        // upload file
		$file->move($tujuan_upload,$file->getClientOriginalName());

		$path = '/shipment_receipt/'.$file->getClientOriginalName();

    return response()->json([
      'success' => true,
			'path' => $path
    ]);
	}

	public function upload_payment_receipt(Request $request){
		$this->validate($request, [
			'file' => 'required',
		]);
 
		// menyimpan data file yang diupload ke variabel $file
		$file = $request->file('file');
 
    // isi dengan nama folder tempat kemana file diupload
    $filename = time()."_".$file->getClientOriginalName();
		$tujuan_upload = 'payment_receipt';

    Upload::create([
			'name' => $filename
		]);
 
        // upload file
		$file->move($tujuan_upload,$file->getClientOriginalName());

		$path = '/payment_receipt/'.$file->getClientOriginalName();

    return response()->json([
      'success' => true,
			'path' => $path
    ]);
	}
}
