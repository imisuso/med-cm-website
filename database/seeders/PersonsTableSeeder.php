<?php

namespace Database\Seeders;

use App\Models\Person;
use Illuminate\Database\Seeder;

class PersonsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $persons = [
            '26:99999999:นาย:Mr.:ผู้ดูแลสูงสุด:ตั้งต้น:b:seeder:seeder'
        ];

        foreach ($persons as $person) {
            list($division_id, $sap_id, $title_th, $title_en, $fname_th, $lname_th, $person_type, $user_previous_act, $user_last_act) = explode(":", $person);
            $person =     Person::create([
                            'division_id' => $division_id,
                            'sap_id' => $sap_id,
                            'title_th' => $title_th,
                            'title_en' => $title_en,
                            'fname_th' => $fname_th,
                            'lname_th' => $lname_th,
                            'type' => $person_type,
                            'profiles' => ['leader' => false],
                            'cert' => "[]",
                            'user_previous_act' => $user_previous_act,
                            'user_last_act' => $user_last_act
                        ]);
        }
    }
}
