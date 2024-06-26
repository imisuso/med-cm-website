<?php

namespace App\APIs;

use App\Contracts\AuthUserAPI;
use Illuminate\Support\Facades\Http;

class PortalAPI implements AuthUserAPI
{

    public function authenticate($orgId, $password)
    {
        $token = config('app.PORTAL_API_SERVICE_TOKEN');
        $baseUrl = config('app.PORTAL_API_SERVICE_URL');

//        $headers = ['app' => config('app.HAN_API_SERVICE_SECRET'), 'token' => config('app.HAN_API_SERVICE_TOKEN')];
//        $options = ['timeout' => 8.0, 'verify' => false];
//        $url = config('app.HAN_API_SERVICE_URL').'auth';
//        $response = Http::withHeaders($headers)->withOptions($options)
//            ->post($url, ['login' => $orgId, 'password' => $password]);

        $response = Http::withToken($token)
            ->acceptJson()
            ->post($baseUrl.'authenticate', ['login' => $orgId, 'password' => $password]);

        //dd($response);
        $data = json_decode($response->getBody(),true);

        if($response->status()!=200){
            return ['reply_code' => '1', 'reply_text' => 'ไม่สามารถเรียกใช้งาน service สำหรับยืนยันตัวตนของภาควิชาฯได้','found'=>false];
        }
        if(!$data['ok']) {
            return ['reply_code' => '2', 'reply_text' => 'ไม่สามารถเรียกใช้งาน service สำหรับยืนยันตัวตนของคณะแพทย์ฯศิริราชได้','found'=>false];
        }
        if(!$data['found']) {
            return ['reply_code' => '3', 'reply_text' => $data['message'],'found'=>false];
        }

        $data['name'] = $data['full_name'];
        $data['remark'] = $data['office_name']." ".$data['department_name'];
        $data['name_en'] = $data['full_name_en'];
        $data['reply_code'] = 0;


        return $data;

    }
}
