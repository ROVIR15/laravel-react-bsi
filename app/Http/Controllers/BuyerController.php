<?php

namespace App\Http\Controllers;

use Faker\Generator as Faker;

use Exception;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Party\Address;
use App\Models\Party\Person;
use App\Models\Party\Organization;
use App\Models\Party\Party;
use App\Models\Party\PartyRoles;
use App\Models\Party\Relationship;

use App\Http\Resources\Party\BuyerCollection;

class BuyerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $param = $request->all();
      $query = Party::with('party_roles', 'address')->get();

      $data = DB::table("party as p")
      ->leftJoin("address as a", function($join){
          $join->on("a.party_id", "=", "p.id");
      })
      ->join("party_roles as pr", function($join){
          $join->on("pr.party_id", "=", "p.id");
      })
      ->leftJoin("relationship as r", function($join){
          $join->on("pr.relationship_id", "=", "r.id");
      })
      ->select("p.id", "p.name", "p.email", "p.npwp", "r.name as type", "a.street", "a.city", "a.province", "a.country")
      ->where("r.name", "=", "Buyer")
      ->get();
      return response()->json($data);
    //   return new BuyerCollection($query);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Faker $faker)
    {
      $param = $request->all()['payload'];
      
      try {

        $parties;
        $type;

        if ($param['type'] === "Person") {
          $type = Person::create([
            'id' => $faker->unique()->numberBetween(1,2303)
          ]);

          $parties = Party::create([
            'id' => $faker->unique()->numberBetween(1,1231),
            'name' => $param['name'],
            'email' => $param['email'],
            'npwp' => $param['npwp'],
            'person_party_id' => $type['id']
          ]);
        } 

        if ($param['type'] === "Organization") {
          $type = Organization::create([
            'id' => $faker->unique()->numberBetween(1,2303)
          ]);

          $parties = Party::create([
            'id' => $faker->unique()->numberBetween(1,1231),
            'name' => $param['name'],
            'email' => $param['email'],
            'npwp' => $param['npwp'],
            'organization_party_id' => $type['id']
          ]);
        }

        $_pr = PartyRoles::create([
          'id' => $faker->unique()->numberBetween(1,2303),
          'party_id' => $parties['id'],
          'relationship_id' => 1
        ]);

        $_addr = Address::create([
          'id' => $faker->unique()->numberBetween(1,1231),
          'party_id' => $parties['id'],
          'street' => $param['address']['street'],
          'city' => $param['address']['city'],
          'province' => $param['address']['province'],
          'country' => $param['address']['country'],
          'postal_code' => $param['address']['postal_code']
        ]);

        return response()->json([
          'success' => true,
        ], 200);
      } catch (Exception $th) {

        return response()->json([
          'success' => false,
          'error' => $th
        ]);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      try {
        $data = DB::table("party as p")
        ->leftJoin("address as a", function($join){
            $join->on("a.party_id", "=", "p.id");
        })
        ->join("party_roles as pr", function($join){
            $join->on("pr.party_id", "=", "p.id");
        })
        ->leftJoin("relationship as r", function($join){
            $join->on("pr.relationship_id", "=", "r.id");
        })
        ->select("p.id", "p.name", "p.email", "p.npwp", "r.name as type", "a.street", "a.city", "a.province", "a.country")
        ->where("r.name", "=", "Buyer")
        ->where("p.id", "=", $id)
        ->get();

        if(!is_array($data) && count($data) === 0) {
            throw new Exception("Not found");
        }

        return response()->json([
          "success" => true,
          "data" => $data
        ]);

      } catch (Exception $th) {
        return response()->json([
          "success" => false,
          "error" => $th->getMessage()
        ], 500);
      }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function edit(X $x)
    {
        //
        try {
            //code...
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request, Faker $faker)
    {
      $param = $request->all()['payload'];
      try {
        $party = $param['party_info'];
        $address = $param['address'];
        $partyType = $param['type']['party'];

        Party::find($id)->update($party);
        Address::where('party_id', $id)->update($address);

        $existingRecord = Party::find($id);

        if ($existingRecord['person_party_id'] === NULL && $partyType === "Person"){
            // Create new row of Person
            $_pt = Person::create([
              'id' => $faker->unique()->numberBetween(1,2303)
            ]);

            // Update data from party table record
            Party::find($id)->update([
              'person_party_id' => $_pt['id'],
              'organization_party_id' => NULL
            ]);

            // Drop organization id
            Organization::where('id', $existingRecord['organization_party_id'])->delete();

        } else if ($existingRecord['organization_party_id'] === NULL && $partyType === "Organization") {
            // Create new row of Person
            $_rt = Organization::create([
              'id' => $faker->unique()->numberBetween(1,2303)
            ]);

            // Update data from party table record
            Party::find($id)->update([
              'organization_party_id' => $_rt['id'],
              'person_party_id' => NULL
            ]);

            // Drop organization id
            Person::where('id', $existingRecord['person_party_id'])->delete();
        }
        return response()->json([
          'success' => true
        ]);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'err' => $th->getMessage()
        ], 500);
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try {
        $existingData = Party::find($id);

        // Turn organization and person id on Party table into NULL
        $existingData->update([
          'organization_party_id' => NULL,
          'person_party_id' => NULL
        ]);

        // Turn party_id on Address Table into NULL
        $selectedAddressByPartyId = Address::where('party_id', $id);
        $selectedAddressByPartyId->update([
          'party_id' => NULL
        ]);

        // Delete Address
        $selectedAddressByPartyId->delete();

        // Drop Party Roles records by party_id
        $selectedPartyRolesByPartyId = PartyRoles::where('party_id', $id);
        $selectedPartyRolesByPartyId->update([
          'party_id' => NULL
        ]);
        
        $selectedPartyRolesByPartyId->delete();

        $existingData->delete();
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'err' => $th->getMessage()
        ], 500);
      }
      
      return response()->json([
        'success' => true
      ]);
    }
}
