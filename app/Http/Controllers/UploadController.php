<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\General\Upload;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
	//
	public function store(Request $request)
	{
		$this->validate($request, [
			'file' => 'required',
		]);

		// menyimpan data file yang diupload ke variabel $file
		$file = $request->file('file');

		// isi dengan nama folder tempat kemana file diupload
		$filename = time() . "_" . $file->getClientOriginalName();
		$tujuan_upload = 'data_file';

		Upload::create([
			'name' => $filename
		]);

		// upload file
		$file->move($tujuan_upload, $file->getClientOriginalName());

		$path = '/data_file/' . $file->getClientOriginalName();

		return response()->json([
			'success' => true,
			'path' => $path
		]);
	}

	public function upload_shipment_receipt(Request $request)
	{
		$this->validate($request, [
			'file' => 'required',
		]);

		// menyimpan data file yang diupload ke variabel $file
		$file = $request->file('file');

		// isi dengan nama folder tempat kemana file diupload
		$filename = time() . "_" . $file->getClientOriginalName();
		$tujuan_upload = 'shipment_receipt';

		Upload::create([
			'name' => $filename
		]);

		// upload file
		$file->move($tujuan_upload, $file->getClientOriginalName());

		$path = '/shipment_receipt/' . $file->getClientOriginalName();

		return response()->json([
			'success' => true,
			'path' => $path
		]);
	}

	public function upload_payment_receipt(Request $request)
	{
		$this->validate($request, [
			'file' => 'required',
		]);

		// menyimpan data file yang diupload ke variabel $file
		$file = $request->file('file');

		// isi dengan nama folder tempat kemana file diupload
		$filename = time() . "_" . $file->getClientOriginalName();
		$tujuan_upload = 'payment_receipt';

		Upload::create([
			'name' => $filename
		]);

		// upload file
		$file->move($tujuan_upload, $file->getClientOriginalName());

		$path = '/payment_receipt/' . $file->getClientOriginalName();

		return response()->json([
			'success' => true,
			'path' => $path
		]);
	}

	public function upload_sales_order(Request $request)
	{
		$this->validate($request, [
			'file' => 'required',
		]);

		// Get the uploaded file
		$file = $request->file('file');

		// Generate a unique filename
		$filename = time() . "_" . uniqid() . "_" . $file->getClientOriginalName();

		// Define the upload directory
		$tujuan_upload = 'sales_order';

		// Create a new record in the Upload model (if applicable)
		Upload::create([
			'name' => $filename
		]);

		// Move the uploaded file to the destination directory with the new filename
		$file->move($tujuan_upload, $filename);

		// Create the path for the uploaded file
		$path = '/' . $tujuan_upload . '/' . $filename;

		return response()->json([
			'success' => true,
			'path' => $path
		]);
	}
}
