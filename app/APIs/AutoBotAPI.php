<?php
namespace App\APIs;

use App\Contracts\AuthUserAPI;
use App\Models\User;
use Faker\Factory;

class AutoBotAPI implements AuthUserAPI
{
    // public function getUser($login)
    // {
    //     $faker = Factory::create();
    //     $user['org_id'] = $faker->numerify('100#####');
    //     $user['name'] = $faker->name();
    //     $user['remark'] = 'ผู้ดูแลระบบ';
    //     $user['name_en'] = '';
    //     $user['email'] = $login.'@med.si';

    //     return $user;
    // }

    public function getUser($login)
    {
        $faker = Factory::create();
        $user['org_id'] = $login['sap_id'];
        $user['name'] = $faker->name();
        $user['remark'] = 'ผู้ดูแลระบบแบบ auto';
        $user['name_en'] = '';
        $user['email'] = $login['name'].'@mahidol.ac.th';
        $user['found'] = true;

        return $user;
    }

    public function authenticate($login, $password)
    {
        $user = User::whereName($login)->first();
        if ( $user && (strcmp($user['sap_id'], $password) === 0) ) {
            return $this->getUser($user);
        } else {
            return ['reply_code' => 1, 'reply_text' => 'credentials not found in our records', 'found' => false];
        }

    //     [
    //         "reply_code" => "1",
    //         "reply_text" => "Username or Password is incorrect",
    //         "found" => "false",
    //     ]
       
    //    /////////////////////////////////////
    //    [
    //         "ok" => true,
    //         "found" => true,
    //         "login" => "sansanee.sum",
    //         "org_id" => "1003xxxx",
    //         "full_name" => "น.ส. ศันสนีย์ สุ่มกล่ำ",
    //         "full_name_en" => "Miss SANSANEE SUMKLAM",
    //         "position_name" => "นักวิชาการคอมพิวเตอร์",
    //         "division_name" => "ภ.อายุรศาสตร์",
    //         "department_name" => "ภ.อายุรศาสตร์",
    //         "office_name" => "สนง.ภาควิชาอายุรศาสตร์",
    //         "email" => "xxx@mahidol.ac.th",
    //         "password_expires_in_days" => 62,
    //         "remark" => "สนง.ภาควิชาอายุรศาสตร์ ภ.อายุรศาสตร์",
    //         "name" => "น.ส. ศันสนีย์ สุ่มกล่ำ",
    //         "name_en" => "Miss SANSANEE SUMKLAM",
    //         "reply_code" => 0,
    //       ]

        // return $login !== $password ?
        //         ['reply_code' => 1, 'reply_text' => 'credentials not found in our records'] :
        //         $this->getUser($login);
    }

}