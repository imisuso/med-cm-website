<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            'admin.med:super_admin:99999999'
        ];

        $password = Hash::make('11111111');

        foreach ($users as $user) {
            list($username, $role_name, $sap_id) = explode(":", $user);
            $user =     User::create([
                            'name' => $username,
                            'email' => $username . '@mahidol.ac.th',
                            'password' => $password,
                            'sap_id' => $sap_id
                        ]);
            
            $user->assignRole($role_name);
        }
    }
}
