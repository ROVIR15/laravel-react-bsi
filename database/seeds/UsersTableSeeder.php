<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('users')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'admin',
                'email' => 'admin@bsi.com',
                'email_verified_at' => NULL,
                'password' => '$2a$12$POWreUgQw5lQooSU5hkFIumYJPJ286QwqstYGk3Xx2Ts8x0dAylqW',
                'remember_token' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Eko',
                'email' => 'ekoarianto.hde@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$fh0yNPXrtfghQ1APa7ub9Oo2NgvuurQ4EesO8cDDaKpeeCHbbG5Kq',
                'remember_token' => NULL,
                'created_at' => '2022-06-23 06:29:02',
                'updated_at' => '2022-06-23 06:29:02',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Alex',
                'email' => 'alex@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$Pfso4W/3WijvZ8dwUwS6eO1U5rp0xP0B/xaTslP7/RuQBbvDUC7w6',
                'remember_token' => NULL,
                'created_at' => '2022-06-23 07:13:36',
                'updated_at' => '2022-06-23 07:13:36',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Alifah',
                'email' => 'alifah@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$flzu8WBd3hXRo58S8mqhG.DHCYtGZ5Ph/XkDgq3HBTje6zfF8idlS',
                'remember_token' => NULL,
                'created_at' => '2022-06-23 07:16:05',
                'updated_at' => '2022-06-23 07:16:05',
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'Mahfud',
                'email' => 'mahfud@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$uoY2Sa5lPRV9bzgHvSWgmOTVkVpKjVMKy5CP9pugvN5NTYP0TV97C',
                'remember_token' => NULL,
                'created_at' => '2022-06-23 07:16:44',
                'updated_at' => '2022-06-23 07:16:44',
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Fian',
                'email' => 'fian@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$PT41iOy0oN9C2nkfxekGH.Y.qWLqZHoLmfT2Azv1rfz4l07v.A6vu',
                'remember_token' => NULL,
                'created_at' => '2022-06-23 07:17:44',
                'updated_at' => '2022-06-23 07:17:44',
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'Operator',
                'email' => 'operator@bsi.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$KyH0D1DCRlyg0oJH/Y5JJul3rN6cR2OBBQjrjtz.sqj07RZpi1zIK',
                'remember_token' => NULL,
                'created_at' => '2022-09-03 01:51:26',
                'updated_at' => '2022-09-03 01:51:26',
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'meti',
                'email' => 'meti.md@harus24.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$YFfx1p0ENpARuiSrG4IbPe3ntRXpGBXIa0UD4D41wqeLrGlFYNvkq',
                'remember_token' => NULL,
                'created_at' => '2022-09-20 06:03:33',
                'updated_at' => '2022-09-20 06:03:33',
            ),
        ));
        
        
    }
}