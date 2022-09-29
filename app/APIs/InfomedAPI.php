<?php

namespace App\APIs;

use App\Models\Person;
use App\Managers\LogManager;
use App\Models\PersonLog;
use App\Models\PersonVersion;

class InfomedAPI
{
    public function checkToken($secret, $token)
    {
        if (strcmp($secret, config('app.INFOMED_API_SERVICE_SECRET') == 0) && strcmp($token, config('app.INFOMED_API_SERVICE_TOKEN') == 0)) {
            return true;
        }

        return false;
    }

    public function insertEmp($data)
    {
        // return response()->json([
        //     'status' => false,
        //     'message' => 'Not Allow emp insert yet'
        //     ], 405);

        // $app_env = env('APP_ENV', 'local');

        if( strcmp(config('app.env'), 'local') === 0 || strcmp(config('app.env'), 'dev') === 0 ) { // กรณีใช้งานที่ local (เครื่องตัวเอง เพื่อจะใช้ postman ทดสอบได้)
            // ข้อมูลที่มาจาก infomed ส่งมาให้ (mb_convert_encoding) ใช้กับ postman
            $sap = $data['sap'];
            $title_th = mb_convert_encoding($data['title_th'], "UTF-8", "auto") ?: "-";
            $title_en = $data['title_en'] ?: null;
            $rname_short_th = mb_convert_encoding(trim($data['rname_short_th']), "UTF-8", "auto") ?: null;
            $rname_full_th = mb_convert_encoding(trim($data['rname_full_th']), "UTF-8", "auto") ?: null;
            $rname_short_en = $data['rname_short_en'] ?: null;
            $fname_th = mb_convert_encoding(trim($data['fname_th']), "UTF-8", "auto") ?: "-";
            $lname_th = mb_convert_encoding(trim($data['lname_th']), "UTF-8", "auto") ?: "-";
            $fname_en = $data['fname_en'] ?: null;
            $lname_en = $data['lname_en'] ?: null;
            $emp_flag = (int)$data['empflag'];
            $user_in = $data['userin'];
        } else { // กรณีใช้งานที่ production หรือไม่ใช่ local
            // ข้อมูลที่มาจาก infomed ส่งมาให้ (iconv)
            $sap = $data['sap'];
            $title_th = iconv('TIS-620', 'UTF-8', $data['title_th']) ?: "-";
            $title_en = $data['title_en'] ?: null;
            $rname_short_th = iconv('TIS-620', 'UTF-8', trim($data['rname_short_th'])) ?: null;
            $rname_full_th = iconv('TIS-620', 'UTF-8', trim($data['rname_full_th'])) ?: null;
            $rname_short_en = $data['rname_short_en'] ?: null;
            $fname_th = iconv('TIS-620', 'UTF-8', $data['fname_th']) ?: "-";
            $lname_th = iconv('TIS-620', 'UTF-8', $data['lname_th']) ?: "-";
            $fname_en = $data['fname_en'] ?: null;
            $lname_en = $data['lname_en'] ?: null;
            $emp_flag = (int)$data['empflag'];
            $user_in = $data['userin'];
        }

        // ข้อมูลที่จะเก็บลงฐานข้อมูล log ในส่วนของข้อมูลที่ได้รับมาจากฝั่ง infomed
        $loginfomed = '[{"sap":"'.$sap.'",
            "title_th":"'.$title_th.'",
            "title_en":"'.$title_en.'",
            "fname_th":"'.$fname_th.'",
            "fname_en":"'.$fname_en.'",
            "lname_th":"'.$lname_th.'",
            "lname_en":"'.$lname_en.'",
            "rname_full_th":"'.$rname_full_th.'",
            "rname_short_th":"'.$rname_short_th.'",
            "rname_short_en":"'.$rname_short_en.'",
            "emp_flag":"'.$emp_flag.'",
            "user_in":"'.$user_in.'"
        }]';

        // ข้อมูลที่อยากให้แสดงตอนแจ้งเตือนผ่าน slack
        $logslack = 'มีการเพิ่มข้อมูลบุคลากรมาจาก infomed-api => '.$title_th.$fname_th;
        // ส่งข้อความแจ้งเตือนทาง slack
        logger($logslack);

        //ตรวจสอบก่อนว่าถ้ามี sap_id นี้ในระบบ website ตาราง person แล้ว จะไม่เพิ่มข้อมูลใหม่
        if (Person::where('sap_id', $sap)->first()) {
            logger("พบข้อมูลนี้ในระบบ website แล้ว จึงยกเลิกการเพิ่มข้อมูลนี้ลงระบบ website");
            $resp = (new LogManager());
            $resp->store(
                $user_in, // มาจากใคร
                'Person Management (จัดการบุคลากร)', // section ของงานอะไร
                'insert',  // action
                'ยกเลิกการเพิ่มบุคลากรใหม่ที่มาจาก infomed เนื่องจาก SAP-ID ['.$sap.'] => Duplicate', // details
                'api' // type
            );

            return response()->json([
                'status' => false,
                'message' => 'Cancel insert emp  => '. $sap
                ], 500);
        }

        // ข้อมูลที่ประกาศขึ้นมาเองใน API
        $group = 1; // default ให้เป็นกลุ่มของ วิชาการ ก่อน
        $type = '-';
        $position_academic = 0;

        // ตรวจสอบว่าเป็น วิชาการสาย ก. หรือ สนับสนุนสาย ข. ที่เป็นวิชาชีพเฉพาะ (แพทย์) หรือไม่ พร้อมระบุตำแหน่งให้
        // ตำแหน่งทางวิชาการ 0 (ไม่ระบุตำแหน่ง), 1 (ศาสตราจารย์), 2 (รองศาสตราจารย์), 3 (ผู้ช่วยศาสตราจารย์), 4 (อาจารย์), 5 (แพทย์ (ผู้ช่วยอาจารย์คลินิก)), 6 (แพทย์ (ประจำโรงพยาบาล))
        if (str_starts_with($rname_full_th, 'ศาสตราจารย์')) {
            $type = 'a';
            $position_academic = 1;
        } elseif (str_starts_with($rname_full_th, 'รองศาสตราจารย์')) {
            $type = 'a';
            $position_academic = 2;
        } elseif (str_starts_with($rname_full_th, 'ผู้ช่วยศาสตราจารย์')) {
            $type = 'a';
            $position_academic = 3;
        } elseif (str_starts_with($rname_full_th, 'อาจารย์')) {
            $type = 'a';
            $position_academic = 4;
        } elseif (str_starts_with($rname_full_th, 'แพทย์')) {
            $type = 'b';
            // ต้องไปตรวจสอบเองอีกทีด้วย เพราะจะไม่รู้ว่าเป็น แพทย์ผู้ช่วยอาจารย์คลินิก  หรือ แพทย์ประจำโรงพยาบาล ซึ่งจะมี check อีกทีตอนที่มีการ update work เข้ามา
            // default เลยใส่เป็น แพทย์ผู้ช่วยอาจารย์คลินิก ไปก่อน
            // group จะต้องเป็น วิชาชีพเฉพาะ
            $position_academic = 5;
            $group = 2;
        }

        // ตรวจสอบว่าเป็นที่ปรึกษาหรือไม่ (จะถูกระบุตำแหน่งทางวิชาการมาจากเงื่อนไขด้านบนแล้ว)
        // ถ้าเป็นที่ปรึกษาที่ไม่ใช่วิชาการสาย ก. จะได้ตำแหน่งทางวิชาการ 0 (ไม่ระบุตำแหน่ง) ตามค่า default ที่ประกาศไว้
        if ($emp_flag === 6) {
            $type = 'z';
            // ถ้า ตำแหน่งทางวิชาการเป็น 0 (ไม่ระบุตำแหน่ง) แสดงว่าไม่ได้อยู่ใน group ของวิชาการ กำหนดให้เป็น 0 ไปเป็น default แล้วให้ไป verify data อีกครั้ง
            if ($position_academic === 0) {
                $group = 0;
            }
        }

        // ตรวจสอบแล้วไม่ใช่ทั้ง วิชาการสาย ก. หรือ สนับสนุนสาย ข. ที่เป็นวิชาชีพเฉพาะ (แพทย์) และที่ปรึกษาที่เป็น วิชาการสาย ก. ก็ต้องเป็นสนับสนุนสาย ข ทั้งหมดที่ไม่ใช่แพทย์.
        // จะได้ตำแหน่งทางวิชาการ 0 (ไม่ระบุตำแหน่ง) ตามค่า default ที่ประกาศไว้
        // และกำหนดให้ group เป็น 0 โดย default แล้วให้ไป verify data อีกครั้ง
        if (strcmp($type, '-') === 0) {
            $type = 'b';
            $group = 0;
        }

        // ตรวจสอบการเปิดแสดงผลข้อมูลบน website
        // 1=ปฏิบัติงาน,2=ลาออก,3=เกษียณอายุ,4=หน่วยงาน,5=ยืมตัว,6=ที่ปรึกษา
        // if ($emp_flag === 2 || $emp_flag === 3 || $emp_flag === 5) {
        //     $status = false;
        // } else {
        //     $status = true;
        // }
        $status = false;  // default ให้ปิดแล้วให้ admin เป็นคนดำเนินการเปิดเองเมื่อ verify ข้อมูลบุคคลากรเรียบร้อยแล้ว

        $resp = (new LogManager());

        try {
            Person::create([
                'division_id'=> 18,  // ให้ default ไปไว้ที่สาขา Gen Med เพราะถ้าเป็น 0 จะไม่สามารถดูข้อมูลได้เลยเพราะไม่ได้อยู่สาขาไหนเลย
                'sap_id'=>$sap,
                'title_th'=>$title_th,
                'title_en'=>$title_en,
                'fname_th'=>$fname_th,
                'fname_en'=>$fname_en,
                'lname_th'=>$lname_th,
                'lname_en'=>$lname_en,
                'rname_full_th'=>$rname_full_th,
                'rname_full_en'=>"-",
                'rname_short_th'=>$rname_short_th,
                'rname_short_en'=>$rname_short_en,
                'group'=>$group,
                'type'=>$type,
                'position_academic'=> $position_academic,
                'profiles'=>['leader'=> false],
                'status'=>$status,
                'cert' => '[]',
                'user_previous_act'=>'api',
                'user_last_act'=>'api'
            ]);
        } catch (\Exception  $e) {
            logger("เกิดข้อผิดพลาด การเพิ่มข้อมูลบุคลากรใหม่ SAP-ID [".$sap."] ไม่สำเร็จเนื่องจาก => ". $e);

            $resp->store(
                $user_in, // มาจากใคร
                'Person Management (จัดการบุคลากร)', // section ของงานอะไร
                'insert',  // action
                'การเพิ่มข้อมูลบุคลากรใหม่จาก infomed SAP-ID ['.$sap.'] ไม่สำเร็จเนื่องจาก =>'.$e, // details
                'api' // type
            );

            return response()->json([
                'status' => false,
                'message' => 'Insert emp fail => '. $sap
                ], 500);
        }

        logger("ทำการเพิ่มข้อมูลบุคลากรใหม่ที่ได้รับมาจาก Infomed เรียบร้อยแล้ว กรุณาตรวจสอบข้อมูลการทำงานหรือตำแหน่งให้ตรงความเป็นจริงทุกครั้งที่ได้ข้อความแจ้งเตือนนี้ เพื่อให้ website แสดงผลได้ถูกต้อง");

        // ข้อมูลที่จะเก็บลงฐานข้อมูล log ในส่วนของข้อมูลที่ได้ทำการแปลงจากฝั่ง infomed และเก็บลงระบบแล้ว
        $logdata = '[{"sap":"'.$sap.'",
            "title_th":"'.$title_th.'",
            "title_en":"'.$title_en.'",
            "fname_th":"'.$fname_th.'",
            "fname_en":"'.$fname_en.'",
            "lname_th":"'.$lname_th.'",
            "lname_en":"'.$lname_en.'",
            "rname_full_th":"'.$rname_full_th.'",
            "rname_short_th":"'.$rname_short_th.'",
            "rname_short_en":"'.$rname_short_en.'",
            "group":"'.$group.'",
            "type":"'.$type.'",
            "position_academic":"'.$position_academic.'"
        }]';

        $resp->store(
            $user_in, // มาจากใคร
            'Person Management (จัดการบุคลากร)', // section ของงานอะไร
            'insert',  // action
            '(เพิ่มข้อมูลส่วนบุคคล) | (ข้อมูลที่ระบบทำการแปลงและจัดเก็บ) => '.$logdata. ' | (ข้อมูลที่รับมาจาก Infomed) => '.$loginfomed, // details
            'api' // type
        );

        return response()->json([
            'status' => true,
            'message' => 'Insert emp success => '. $sap
            ], 200);
    }

    public function updateEmp($data)
    {
        //logger($data);

        if( strcmp(config('app.env'), 'local') === 0 || strcmp(config('app.env'), 'dev') === 0 ) { // กรณีใช้งานที่ local (เครื่องตัวเอง เพื่อจะใช้ postman ทดสอบได้)
            $sap = $data['sap'];
            $title_th = mb_convert_encoding($data['title_th'], "UTF-8", "auto") ?: "-";
            $title_en = $data['title_en'] ?: null;
            $rname_short_th = mb_convert_encoding($data['rname_short_th'], "UTF-8", "auto") ?: null;
            $rname_full_th = mb_convert_encoding($data['rname_full_th'], "UTF-8", "auto") ?: null;
            $rname_short_en = $data['rname_short_en'] ?: null;
            $fname_th = mb_convert_encoding($data['fname_th'], "UTF-8", "auto") ?: "-";
            $lname_th = mb_convert_encoding($data['lname_th'], "UTF-8", "auto") ?: "-";
            $fname_en = $data['fname_en'] ?: null;
            $lname_en = $data['lname_en'] ?: null;
            $emp_flag = (int)$data['empflag'];
            $user_in = $data['userin'];
        } else { // ใช้ iconv สำหรับ production
            $sap = $data['sap'];
            $title_th = iconv('TIS-620', 'UTF-8', $data['title_th']) ?: "-";
            $title_en = $data['title_en'] ?: null;
            $rname_short_th = iconv('TIS-620', 'UTF-8', trim($data['rname_short_th'])) ?: null;
            $rname_full_th = iconv('TIS-620', 'UTF-8', trim($data['rname_full_th'])) ?: null;
            $rname_short_en = $data['rname_short_en'] ?: null;
            $fname_th = iconv('TIS-620', 'UTF-8', $data['fname_th']) ?: "-";
            $lname_th = iconv('TIS-620', 'UTF-8', $data['lname_th']) ?: "-";
            $fname_en = $data['fname_en'] ?: null;
            $lname_en = $data['lname_en'] ?: null;
            $emp_flag = (int)$data['empflag'];
            $user_in = $data['userin'];
        }

        // ข้อมูลที่จะเก็บลงฐานข้อมูล log ในส่วนของข้อมูลที่ได้รับมาจากฝั่ง infomed
        $loginfomed = '[{"sap":"'.$sap.'",
            "title_th":"'.$title_th.'",
            "title_en":"'.$title_en.'",
            "fname_th":"'.$fname_th.'",
            "fname_en":"'.$fname_en.'",
            "lname_th":"'.$lname_th.'",
            "lname_en":"'.$lname_en.'",
            "rname_full_th":"'.$rname_full_th.'",
            "rname_short_th":"'.$rname_short_th.'",
            "rname_short_en":"'.$rname_short_en.'",
            "emp_flag":"'.$emp_flag.'",
            "user_in":"'.$user_in.'"
        }]';

        // Query data with sap_id condition
        $person = Person::where('sap_id', $sap)->first();

        // ตรวจสอบว่าพบข้อมูลบุคลากรที่ต้องการแก้ไขหรือไม่ ถ้าไม่พบให้ return 404
        if (! $person) {
            logger("ไม่พบข้อมูลบุคลากรที่ต้องการแก้ไข SAP-ID => ".$sap);
            return response()->json([
                'status' => false,
                'message' => 'Not Found emp => '. $sap
                ], 404);
        }

        // ข้อมูลที่อยากให้แสดงตอนแจ้งเตือนผ่าน slack
        logger("มีการแก้ไขข้อมูลบุคลากรมาจาก infomed-api");
        $logslack = $title_th.$fname_th.' หน่วย/สาขา : '.$person->division->name_th;
        logger($logslack);

        // ตรวจสอบว่าเป็น วิชาการสาย ก. หรือ สนับสนุนสาย ข. ที่เป็นวิชาชีพเฉพาะ (แพทย์) หรือไม่ พร้อมระบุตำแหน่งให้
        // ตำแหน่งทางวิชาการ 0 (ไม่ระบุตำแหน่ง), 1 (ศาสตราจารย์), 2 (รองศาสตราจารย์), 3 (ผู้ช่วยศาสตราจารย์), 4 (อาจารย์), 5 (แพทย์ (ผู้ช่วยอาจารย์คลินิก)), 6 (แพทย์ (ประจำโรงพยาบาล))
        if (str_starts_with($rname_full_th, 'ศาสตราจารย์')) {
            $person->type = 'a';
            $person->position_academic = 1;
            $person->group = 1;
        } elseif (str_starts_with($rname_full_th, 'รองศาสตราจารย์')) {
            $person->type = 'a';
            $person->position_academic = 2;
            $person->group = 1;
        } elseif (str_starts_with($rname_full_th, 'ผู้ช่วยศาสตราจารย์')) {
            $person->type = 'a';
            $person->position_academic = 3;
            $person->group = 1;
        } elseif (str_starts_with($rname_full_th, 'อาจารย์')) {
            $person->type = 'a';
            $person->position_academic = 4;
            $person->group = 1;
        } elseif (str_starts_with($rname_full_th, 'แพทย์')) {
            $person->type = 'b';
            // ต้องไปตรวจสอบเองอีกทีด้วย เพราะจะไม่รู้ว่าเป็น แพทย์ผู้ช่วยอาจารย์คลินิก  หรือ แพทย์ประจำโรงพยาบาล ซึ่งจะมี check อีกทีตอนที่มีการ update work เข้ามา
            // default เลยใส่เป็น แพทย์ผู้ช่วยอาจารย์คลินิก ไปก่อน
            // group จะต้องเป็น วิชาชีพเฉพาะ
            $person->position_academic = 5;
            $person->group = 2;
        }

        // ตรวจสอบว่าข้อมูลที่ส่งมา update ส่งมาเป็นที่ปรึกษา และข้อมูลใน db ยังไม่ใช่ที่ปรึกษา ให้เปลี่ยนเป็นที่ปรึกษาด้วย
        // แล้วให้ไป verify data ที่หน้า website อีกครั้ง ก่อนเปิดใช้งาน
        if ($emp_flag === 6 && (strcmp($person->type, "z") !== 0)) {
            $person->type = "z";
        }



        //1=ปฏิบัติงาน,2=ลาออก,3=เกษียณอายุ,4=หน่วยงาน,5=ยืมตัว,6=ที่ปรึกษา
        if ($emp_flag === 2 || $emp_flag === 3 || $emp_flag === 5) {
            $person->status = false;
        }
        // if ($emp_flag === 2 || $emp_flag === 3 || $emp_flag === 5) {
        //     $person->status = false;
        // } else {
        //     $person->status = true;
        // }

        // Update to Object is get from DB query if can convert charset else use old data
        $person->title_th = $title_th ?: $person->title_th;
        $person->title_en = $title_en;
        $person->rname_short_th = $rname_short_th ?: $person->rname_short_th;
        $person->rname_full_th = $rname_full_th ?: $person->rname_full_th;
        $person->rname_short_en = $rname_short_en;
        $person->fname_th = $fname_th ?: $person->fname_th;
        $person->lname_th = $lname_th ?: $person->lname_th;
        $person->fname_en = $fname_en;
        $person->lname_en = $lname_en;
        $person->user_previous_act = $person->user_last_act;
        $person->user_last_act = $user_in;

        $resp = (new LogManager());
        $logdata = '[{"sap":"'.$sap.'",
            "title_th":"'.$person->title_th.'",
            "title_en":"'.$person->title_en.'",
            "fname_th":"'.$person->fname_th.'",
            "fname_en":"'.$person->fname_en.'",
            "lname_th":"'.$person->lname_th.'",
            "lname_en":"'.$person->lname_en.'",
            "rname_full_th":"'.$person->rname_full_th.'",
            "rname_short_th":"'.$person->rname_short_th .'",
            "rname_short_en":"'.$person->rname_short_en.'",
            "type":"'.$person->type.'",
            "position_academic":"'.$person->position_academic.'",
            "group":"'.$person->group.'",
            "status":"'.$person->status.'"
        }]';

        try {
            // เก็บค่าเก่าก่อนทำการแก้ไข
            $old = $person->getOriginal();

            // Save ข้อมูลใหม่ลง DB
            $person->save();
        } catch (\Exception  $e) {
            $log_message = "แก้ไขข้อมูลบุคลากร ".$logslack." ไม่สำเร็จเนื่องจาก => ".$e;
            logger($log_message);

            $resp->store(
                user: $user_in, // มาจากใคร
                section: 'Person Management (จัดการบุคลากร)', // section ของงานอะไร
                action: 'update',  // action
                details: $log_message, // details
                type: 'api' // type
            );

            return response()->json([
                'status' => false,
                'message' => 'Update emp fail => '. $sap
                ], 500);
        }

        logger("ทำการแก้ไขข้อมูลบุคลากรที่ได้รับมาจาก Infomed เรียบร้อยแล้ว กรุณาตรวจสอบข้อมูลการทำงานหรือตำแหน่งให้ตรงความเป็นจริงทุกครั้งที่ได้ข้อความแจ้งเตือนนี้ เพื่อให้ website แสดงผลได้ถูกต้อง");

        $log_id = $resp->store(
                        $user_in, // มาจากใคร
                        'Person Management (จัดการบุคลากร)', // section ของงานอะไร
                        'update',  // action
                        '(แก้ไขข้อมูลส่วนบุคคล) | (ข้อมูลที่ระบบทำการแปลงและจัดเก็บ) => '.$logdata. ' | (ข้อมูลที่รับมาจาก Infomed) => '.$loginfomed, // details
                        'api' // type
                    );
        // สร้าง backup version ของ person model หลังจากสร้าง log แล้วเพื่อ เอาค่า id ของ log เก็บเข้าไปด้วย
        $old['trace_log_id'] = $log_id ?: 0;
        $old['person_id'] = $old['id'];
        $old['record_updated'] = $old['updated_at'];
        PersonVersion::query()->create($old);


        return response()->json([
            'status' => true,
            'message' => 'Update emp success => '. $sap
            ], 200);
    }

//    public function testPersonLog($data) {
//
//        $title_th = iconv("TIS-620", "UTF-8//IGNORE", $data['title_th']) ?: null;
////        $fname_th = iconv("TIS-620", "UTF-8////TRANSLIT", $data['fname_th']) ?: null;
//        $fname_th = mb_convert_encoding($data['fname_th'], "UTF-8", "auto") ?: null;
//        $lname_th = iconv("TIS-620", "UTF-8//IGNORE", $data['lname_th']) ?: null;
//        $rname_short_th = iconv("TIS-620", "UTF-8//IGNORE", $data['rname_short_th']) ?: null;
//        $rname_full_th = iconv("TIS-620", "UTF-8//IGNORE", $data['rname_full_th']) ?: null;
//
//        $logslack = '[{"title_th":"'.$title_th.'",
//            "fname_th":"'.$fname_th.'",
//            "lname_th":"'.$lname_th.'",
//            "rname_short_th":"'.$rname_short_th.'",
//            "rname_full_th":"'.$rname_full_th.'"
//        }]';
//
//        logger("Test ICONV from postman");
//        logger($logslack);
//
//        return response()->json([
//            'status' => true,
//            'message' => 'Test success => '. $data['sap']
//        ], 200);
//    }

    public function updateWork($data)
    {
        // return response()->json([
        //         'status' => false,
        //         'message' => 'Not Allow work update yet'
        //         ], 405);

        //logger($data);

        $sap = $data['sap'];
        $division_id = (int)$data['division_id'];
        $type = $data['type'];
        $group = $data['group'];
        // สำหรับใช้กับ postman เพื่อทดสอบ
        if( strcmp(config('app.env'), 'local') === 0 || strcmp(config('app.env'), 'dev') === 0 ) {
            $position_division = mb_convert_encoding(trim($data['position_division']), "UTF-8", "auto") ?: null;
            $reward = mb_convert_encoding(trim($data['technic_name']), "UTF-8", "auto") ?: null;
        } else {
            //สำหรับใช้กับ production
            $position_division = iconv('TIS-620', 'UTF-8', trim($data['position_division'])) ?: null;
            $reward = iconv('TIS-620', 'UTF-8', trim($data['technic_name'])) ?: null;
        }

        $manager_flag = (int)$data['manager_flag'];
        $user_in = $data['userin'];

        // ข้อมูลที่จะเก็บลงฐานข้อมูล log ในส่วนของข้อมูลที่ได้รับมาจากฝั่ง infomed
        $loginfomed = '[{"sap":"'.$sap.'",
            "division_id":"'.$division_id.'",
            "type":"'.$type.'",
            "group":"'.$group.'",
            "position_division":"'.$position_division.'",
            "technic_name":"'.$reward.'",
            "manager_flag":"'.$manager_flag.'",
            "user_in":"'.$user_in.'"
        }]';

        // Query data with sap_id condition
        $person = Person::where('sap_id', $sap)->first();

        $resp = (new LogManager());

        logger("มีการแก้ไขข้อมูลงานของบุคลากรมาจาก infomed-api");
        // ตรวจสอบว่าพบข้อมูลบุคลากรที่ต้องการแก้ไขหรือไม่ ถ้าไม่พบให้ return 404
        if (! $person) {
            logger("ไม่พบข้อมูลบุคลากรที่ต้องการแก้ไข SAP-ID => ".$sap);

            return response()->json([
                'status' => false,
                'message' => 'Not Found emp => '. $sap
                ], 404);
        }

        // ข้อมูลที่อยากให้แสดงตอนแจ้งเตือนผ่าน slack
        $logslack = $person->title_th.$person->fname_th.' หน่วย/สาขา : '.$person->division->name_th;
        logger($logslack);

        // Update to DB
        $person->division_id = $division_id ?: $person->division_id;

        if (strcmp($person->type, "z") === 0) {
            $type = 'z';
        }
        $person->type = $type ?: $person->type;

        $person->group = $group ?: $person->group;
        $person->position_division = $position_division ?: $person->position_division;
        $person->reward = $reward ?: $person->reward;
        $profiles = $person->profiles;

        if ($manager_flag) {
            $profiles['leader'] = true;
        } else {
            $profiles['leader'] = false;
        }

        $person->profiles = $profiles;
        $person->user_previous_act = $person->user_last_act;
        $person->user_last_act = $user_in;

        try {
            // เก็บค่าเก่าก่อนทำการแก้ไข
            $old = $person->getOriginal();
            // จัดเก็บค่าใหม่
            $person->save();
        } catch (\Exception  $e) {
            $log_message = "แก้ไขข้อมูลงานของบุคลากร ".$logslack." ไม่สำเร็จเนื่องจาก => ".$e;
            logger($log_message);

            $resp->store(
                $user_in, // มาจากใคร
                'Person Management (จัดการบุคลากร)', // section ของงานอะไร
                'update',  // action
                $log_message, // details
                'api' // type
            );

            return response()->json([
                'status' => false,
                'message' => 'Update work fail => '. $sap
                ], 500);
        }

        logger("ทำการแก้ไขข้อมูลงานของบุคลากรที่ได้รับมาจาก Infomed เรียบร้อย กรุณาตรวจสอบข้อมูลการทำงานหรือตำแหน่งให้ตรงความเป็นจริงทุกครั้งที่ได้ข้อความแจ้งเตือนนี้ เพื่อให้ website แสดงผลได้ถูกต้อง");

        $logdata = '[{"sap":"'.$sap.'",
            "division_id":"'.$division_id.'",
            "$type":"'.$type.'",
            "group":"'.$group.'",
            "position_division":"'.$position_division.'",
            "reward":"'.$reward.'",
            "leader":"'.$manager_flag.'"
        }]';

        $log_id = $resp->store(
            $user_in, // มาจากใคร
            'Person Management (จัดการบุคลากร)', // section ของงานอะไร
            'update',  // action
            '(แก้ไขข้อมูลงานบุคลากร) | (ข้อมูลที่ระบบทำการแปลงและจัดเก็บ) => '.$logdata. ' | (ข้อมูลที่รับมาจาก Infomed) => '.$loginfomed, // details
            'api' // type
        );

        // สร้าง backup version ของ person model หลังจากสร้าง log แล้วเพื่อ เอาค่า id ของ log เก็บเข้าไปด้วย
        $old['trace_log_id'] = $log_id ?: 0;
        $old['person_id'] = $old['id'];
        $old['record_updated'] = $old['updated_at'];
        PersonVersion::query()->create($old);

        return response()->json([
            'status' => true,
            'message' => 'Update work success=> '. $sap
            ], 200);
    }

    public function deleteEmp($data)
    {
        logger("มีการลบข้อมูลบุคลากรจาก infomed (Notify Only)");

        $sap = $data['sap'];
        $user_in = $data['userin'];

        $resp = (new LogManager());

        $person = Person::where('sap_id', $sap)->first();

        // ตรวจสอบว่าพบข้อมูลบุคลากรในระบบ website ที่โดนลบจาก infomed ถ้าไม่พบให้ return 404
        if (! $person) {
            logger("ไม่พบข้อมูลบุคลากรที่ต้องการลบใน website SAP-ID => ".$sap);

            return response()->json([
                'status' => false,
                'message' => 'Not Found emp => '. $sap
            ], 404);
        }

        // ข้อมูลที่อยากให้แสดงตอนแจ้งเตือนผ่าน slack
        $logslack = $person->title_th.$person->fname_th.' หน่วย/สาขา : '.$person->division->name_th;
        logger($logslack);


        $resp->store(
            $user_in, // มาจากใคร
            'Person Management (จัดการบุคลากร)', // section ของงานอะไร
            'notify',  // action
            '(ลบข้อมูลบุคลากร Notify Only) => '.$logslack, // details
            'api' // type
        );

        return response()->json([
            'status' => true,
            'message' => 'Notify success'
            ], 200);
    }

    public function monitor($sap, $secret, $token)
    {
        // $headers = ['app' => config('app.INFOMED_API_SERVICE_SECRET'), 'token' => config('app.INFOMED_API_SERVICE_TOKEN')];
        // $options = ['timeout' => 8.0, 'verify' => false];

        if (strcmp($secret, config('app.INFOMED_API_SERVICE_SECRET') == 0) && strcmp($token, config('app.INFOMED_API_SERVICE_TOKEN') == 0)) {
            logger($sap);

            return response()->json([
                'status' => true
                ], 200);
        }

        return response()->json([
            'status' => false
            ], 401);
    }
}
