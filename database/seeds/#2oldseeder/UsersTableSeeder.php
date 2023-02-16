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
                'password' => '$2y$10$n/XnZL9jtBWnHOZRR5DqoeYaElv1F0LVXGdFIvqZS9qeCxIBi.78i',
                'remember_token' => NULL,
                'created_at' => '2022-06-23 06:29:02',
                'updated_at' => '2022-10-03 07:22:37',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Alex',
                'email' => 'alexwartono@atw-corp.com',
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
                'password' => '$2y$10$4TUuPXRydEK8qe91x1U9reVQLemKtzSVSqNtEvAMXnraNYLfOSaJC',
                'remember_token' => NULL,
                'created_at' => '2022-06-23 07:16:05',
                'updated_at' => '2022-10-06 01:35:43',
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
            8 => 
            array (
                'id' => 10,
                'name' => 'Testing',
                'email' => 'test@gggma.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$oVnPn3m8CQKMbmIjU5PU..WFbU6HX5zbpHS2xjGWXUE3esWKep0W.',
                'remember_token' => NULL,
                'created_at' => '2022-10-02 15:35:48',
                'updated_at' => '2022-10-02 15:35:48',
            ),
            9 => 
            array (
                'id' => 11,
                'name' => 'Dwiyanto',
                'email' => 'dwiyanto.purchasing@harus24.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$0x7ri1fYueO6jOcxvlr9UejsDUMMAdFXzc1DKSYNcMPS0423IdDDm',
                'remember_token' => NULL,
                'created_at' => '2022-10-02 18:23:07',
                'updated_at' => '2022-10-02 18:23:07',
            ),
            10 => 
            array (
                'id' => 12,
                'name' => 'TisaAdmin',
                'email' => 'tisa.bsi@bsi-garment.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$/TveL58LCtV02UgH3E4qiOgjXWiMmcDIlxL/Fm4q9X3qYbVr9AlFW',
                'remember_token' => NULL,
                'created_at' => '2022-10-03 07:26:38',
                'updated_at' => '2022-10-06 01:47:54',
            ),
            11 => 
            array (
                'id' => 13,
                'name' => 'IndriRahayu',
                'email' => 'indri79@atw-corp.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$yr9vuqwEJzb7NLsOW3rNPe/Ne/IgqZDOdjm4pT8brxUCRm0mtEfx.',
                'remember_token' => NULL,
                'created_at' => '2022-10-05 01:47:11',
                'updated_at' => '2022-10-24 07:34:06',
            ),
            12 => 
            array (
                'id' => 14,
                'name' => 'Firda',
                'email' => 'ppicbsi@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$fSkXHT8lVClxuQ1j7tEYbukSMhE/idHgpl2NROgnBKVr.kcM4PoYC',
                'remember_token' => NULL,
                'created_at' => '2022-10-06 01:32:16',
                'updated_at' => '2022-10-06 01:32:16',
            ),
            13 => 
            array (
                'id' => 15,
                'name' => 'QC',
                'email' => 'qcbsi@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$VD16vacR519CUt.7rxm1R.CsdNS0lniStTJSDQp9K8zcBnj4nUclq',
                'remember_token' => NULL,
                'created_at' => '2022-10-06 01:45:54',
                'updated_at' => '2022-10-06 01:45:54',
            ),
            14 => 
            array (
                'id' => 16,
                'name' => 'AdminFinishing',
                'email' => 'finishing@bsi-garment.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$o/zX2Q/MIsTEwUkr4MAdsO5nSvBAft2XRBU1F6q0bcnnGR1HwCq6C',
                'remember_token' => NULL,
                'created_at' => '2022-10-06 01:51:59',
                'updated_at' => '2022-10-06 01:51:59',
            ),
            15 => 
            array (
                'id' => 17,
                'name' => 'AdminGudang',
                'email' => 'gudangbsi123@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$Fc0upClCO76EurgzUK0rIOziVerBEZccY7Mv/Tl92T1dSnD20J6ZK',
                'remember_token' => NULL,
                'created_at' => '2022-10-07 02:39:22',
                'updated_at' => '2022-10-07 02:39:22',
            ),
            16 => 
            array (
                'id' => 18,
                'name' => 'Jaja Misja',
                'email' => 'jajamisja@bsigarment.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$blw2FDkQriPILFUFtOHnoO7Ch32Qd7pICCGwPImpy14jkvJe3O5X6',
                'remember_token' => NULL,
                'created_at' => '2022-10-13 06:41:05',
                'updated_at' => '2022-10-13 06:41:05',
            ),
            17 => 
            array (
                'id' => 19,
                'name' => 'MahfudIE',
                'email' => 'mahfud@bsigarment.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$qy9ZeGWW7khRcJaac2nv/O5aoWWLeTk531oZOOcMWYg5jygn0NOu.',
                'remember_token' => NULL,
                'created_at' => '2022-10-14 12:11:40',
                'updated_at' => '2022-10-14 12:11:40',
            ),
            18 => 
            array (
                'id' => 20,
                'name' => 'IqbalBMS',
                'email' => 'iqsarmy93@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$dd015fGXynDJd6sVmnx8kOtzrbijr9pPvXsY6QR9t./JaREOr05em',
                'remember_token' => NULL,
                'created_at' => '2022-10-17 03:01:11',
                'updated_at' => '2022-10-17 03:01:11',
            ),
            19 => 
            array (
                'id' => 22,
                'name' => 'UlulAzmi',
                'email' => 'ulul@bsigarment.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$FGhGkjHLglz0JhldMe5nzuP3Hkju7G4HbxfzrOPzUz0Rbq4N61gom',
                'remember_token' => NULL,
                'created_at' => '2022-10-18 06:59:07',
                'updated_at' => '2022-10-18 06:59:07',
            ),
            20 => 
            array (
                'id' => 23,
                'name' => 'CuttingYuli',
                'email' => 'cuttingbsigarment@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$x.w4ZJ4fQWyfu2J9VXo.He7UkrPRV.qEJtoChHCrx0tjv1QPTA2im',
                'remember_token' => NULL,
                'created_at' => '2022-10-20 02:35:11',
                'updated_at' => '2022-10-20 02:35:11',
            ),
            21 => 
            array (
                'id' => 24,
                'name' => 'CuttingFarida',
                'email' => 'cuttingbsigarment2@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$vPojqPelJa8eAX6/uDLh2uh8JJRPRgM.zzgXAYlAntHF6meUxx5YK',
                'remember_token' => NULL,
                'created_at' => '2022-10-20 02:58:10',
                'updated_at' => '2022-10-20 02:58:10',
            ),
            22 => 
            array (
                'id' => 25,
                'name' => 'Rindu',
                'email' => 'rindu.rinii888@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$Ac/NqT.0w1wD8mbzZJW0ieIKxG9qhq1f0VTENDZGy8J10bWsCGGbe',
                'remember_token' => NULL,
                'created_at' => '2022-10-26 07:50:06',
                'updated_at' => '2022-10-26 07:50:06',
            ),
            23 => 
            array (
                'id' => 26,
                'name' => 'LiezMarketing',
                'email' => 'liez.marketing@harus24.com',
                'email_verified_at' => NULL,
                'password' => '$2y$10$sOPTX3k4zfKGiI5g6gW5mu8l.M.WlIzvqtGNMJZUC0dgffS7pn3AK',
                'remember_token' => NULL,
                'created_at' => '2022-10-26 07:51:02',
                'updated_at' => '2022-10-26 07:51:02',
            ),
        ));
        
        
    }
}