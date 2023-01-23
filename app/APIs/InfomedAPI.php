<?php

namespace App\APIs;

use App\Models\Person;
use App\Models\User;
use App\Managers\LogManager;
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
            "user_in":"'.$user_in.'"
        }]';

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

        // ข้อมูลที่ประกาศขึ้นมาเองใน API (ใช้สำหรับเพิ่มลง datatabase ที่กำหนดไม่ให้เป็น null และ ไม่มีค่า default ให้ เพราะทาง infomed ยังไม่มีข้อมูลส่งมาให้จนกว่าจะ update ในส่วนของงานบุคลากร)
        $type = 'd'; // default ให้เป็นประเภท สายสนับสนุน(ค)(เจ้าหน้าที่) ก่อน
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
                'type'=>$type,
                'profiles'=>['leader'=> false, 'teacher'=> false],
                'status'=>$status,
                'cert' => '[]',
                'user_previous_act'=>$user_in,
                'user_last_act'=>$user_in
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

        // ข้อมูลที่อยากให้แสดงตอนแจ้งเตือนผ่าน slack
        $logslack = 'มีการเพิ่มข้อมูลบุคลากรมาจาก infomed-api => '.$title_th.$fname_th.' กรุณาตรวจสอบข้อมูลการทำงานหรือตำแหน่งให้ตรงความเป็นจริงทุกครั้งที่ได้ข้อความแจ้งเตือนนี้ เพื่อให้ website แสดงผลได้ถูกต้อง (หมายเหตุ ทาง HR ภาควิชาฯ ต้องทำการ update ข้อมูลงานของบุคลากรให้แล้วเสร็จด้วย)';

        // ส่งข้อความแจ้งเตือนทาง slack
        logger($logslack);

        $resp->store(
            $user_in, // มาจากใคร
            'Person Management (จัดการบุคลากร)', // section ของงานอะไร
            'insert',  // action
            '(เพิ่มข้อมูลส่วนบุคคล) | (ข้อมูลที่รับมาจาก Infomed) => '.$loginfomed, // details
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
        $sap = $data['sap'];

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

        if( strcmp(config('app.env'), 'local') === 0 || strcmp(config('app.env'), 'dev') === 0 ) { // กรณีใช้งานที่ local (เครื่องตัวเอง เพื่อจะใช้ postman ทดสอบได้)
            $title_th = mb_convert_encoding($data['title_th'], "UTF-8", "auto") ?: "-";
            $title_en = $data['title_en'] ?: $person->title_en;
            $rname_short_th = mb_convert_encoding($data['rname_short_th'], "UTF-8", "auto") ?: $person->rname_short_th;
            $rname_full_th = mb_convert_encoding($data['rname_full_th'], "UTF-8", "auto") ?: $person->rname_full_th;
            $rname_short_en = $data['rname_short_en'] ?: $person->rname_short_en;
            $fname_th = mb_convert_encoding($data['fname_th'], "UTF-8", "auto") ?: $person->fname_th;
            $lname_th = mb_convert_encoding($data['lname_th'], "UTF-8", "auto") ?: $person->lname_th;
            $fname_en = $data['fname_en'] ?: $person->fname_en;
            $lname_en = $data['lname_en'] ?: $person->lname_en;
            $emp_flag = (int)$data['empflag'];
            $user_in = $data['userin'];
        } else { // ใช้ iconv สำหรับ production
            $title_th = iconv('TIS-620', 'UTF-8', $data['title_th']) ?: "-";
            $title_en = $data['title_en'] ?: $person->title_en;
            $rname_short_th = iconv('TIS-620', 'UTF-8', trim($data['rname_short_th'])) ?: $person->rname_short_th;
            $rname_full_th = iconv('TIS-620', 'UTF-8', trim($data['rname_full_th'])) ?: $person->rname_full_th;
            $rname_short_en = $data['rname_short_en'] ?: $person->rname_short_en;
            $fname_th = iconv('TIS-620', 'UTF-8', $data['fname_th']) ?: $person->fname_th;
            $lname_th = iconv('TIS-620', 'UTF-8', $data['lname_th']) ?: $person->lname_th;
            $fname_en = $data['fname_en'] ?: $person->fname_en;
            $lname_en = $data['lname_en'] ?: $person->lname_en;
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

        //1=ปฏิบัติงาน,2=ลาออก,3=เกษียณอายุ,4=หน่วยงาน,5=ยืมตัว,6=ที่ปรึกษา
        // ปิดการแสดงผลอัตโนมัติ ใน 3 กรณี
        if ($emp_flag === 2 || $emp_flag === 3 || $emp_flag === 5) {
            $person->status = false;
        }

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

        // ตรวจสอบว่าข้อมูลที่ส่งมา update มีอะไรเปลี่ยนแปลงไหม ถ้าเป็นข้อมูลเดิม ไม่ต้องแจ้งทาง slack และให้จบการทำงานเลย
        if( $person->isClean() ) {
            return response()->json([
                'status' => true,
                'message' => 'User is clean update => '. $sap
            ], 200);
        }

        $person->user_previous_act = $person->user_last_act;
        $person->user_last_act = $user_in;

        // ข้อมูลที่อยากให้แสดงตอนแจ้งเตือนผ่าน slack
        $logslack = $person->title_th.$person->fname_th.' หน่วย/สาขา : '.$person->division->name_th;

        $resp = (new LogManager());

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

        logger("มีการแก้ไขข้อมูลบุคลากร => {$logslack} มาจาก infomed-api");

        $log_id = $resp->store(
                        $user_in, // มาจากใคร
                        'Person Management (จัดการบุคลากร)', // section ของงานอะไร
                        'update',  // action
                        '(แก้ไขข้อมูลส่วนบุคคล) | (ข้อมูลที่รับมาจาก Infomed) => '.$loginfomed, // details
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

    // การแก้ไข sap จะมีปัญหาก็ต่อเมื่อ ถ้าทำการ update ข้อมูลไปแล้ว แต่ sap_id ที่ AD ยังไม่ได้ถูกแก้ไข และ sap_id นี้เป็น user ที่ใช้งาน website โดยมีสิทธิ์ login เข้ามาจะทำให้ ไม่พบข้อมูลของ user นี้ในในตาราง person
    // เนื่องจากเมื่อทำการ authen จาก service hannah ผ่านแล้ว จะใช้ sap_id จาก AD มาทำงานต่อเพื่อนำมาหาข้อมูล บุคลากรในตาราง person ต่อไป
    // แต่ข้อมูล sap_id ใน ตาราง person ถูก update ไปแล้ว จะทำให้ไม่พบข้อมูลและทำให้ website เกิด error เวลา user นั้น login เข้ามาใช้งาน
    public function updSap($data)
    {
        $current_sap = $data['old_sap'];
        $new_sap = $data['new_sap'];
        $user_in = $data['userin'];

        $person = Person::where('sap_id', $current_sap)->first();

        $resp = (new LogManager());

        // ตรวจสอบว่าพบข้อมูลบุคลากรที่ต้องการแก้ไข sap หรือไม่ ถ้าไม่พบให้ return 404
        if (! $person) {
            logger("ไม่พบข้อมูลบุคลากรที่ต้องการแก้ไข SAP-ID => ".$current_sap);

            return response()->json([
                'status' => false,
                'message' => 'Not Found emp => '. $current_sap
            ], 404);
        }

        $exist_sap = Person::where('sap_id', $new_sap)->first();
        // ตรวจสอบ sap ที่ต้องการเปลี่ยนแปลง ว่าเป็นของบุคลากรคนอื่นๆในระบบบ หรือไม่ ถ้ามีอยู่แล้วให้ return 404
        if ( $exist_sap ) {
            logger("พบข้อมูล sap ที่ต้องการแก้ไขในระบบอยู่แล้ว SAP-ID => ".$new_sap);

            return response()->json([
                'status' => false,
                'message' => 'This SAP ID is used by another person => '. $new_sap
            ], 404);
        }

        // ข้อมูลที่อยากให้แสดงตอนแจ้งเตือนผ่าน slack
        $logslack = $person->title_th.$person->fname_th.' หน่วย/สาขา : '.$person->division->name_th;

        // Update to Object
        $person->sap_id = $new_sap ?: $person->sap_id;

        // ตรวจสอบว่าข้อมูลที่ส่งมา update มีอะไรเปลี่ยนแปลงไหม ถ้าเป็นข้อมูลเดิม ไม่ต้องแจ้งทาง slack และให้จบการทำงานเลย
        if( $person->isClean() ) {
            return response()->json([
                'status' => true,
                'message' => 'User is clean update'
            ], 200);
        }

        $person->user_previous_act = $person->user_last_act;
        $person->user_last_act = $user_in;

        try {
            // เก็บค่าเก่าก่อนทำการแก้ไข
            $old = $person->getOriginal();
            // จัดเก็บค่าใหม่ (Update to DB)
            $person->save();
        } catch (\Exception  $e) {
            $log_message = "แก้ไขข้อมูล sap_id ของบุคลากร ".$logslack." ไม่สำเร็จเนื่องจาก => ".$e;
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
                'message' => 'Update sap id fail'
            ], 500);
        }

        logger("มีการแก้ไขข้อมูล sap_id ของบุคลากร => {$logslack} มาจาก infomed-api");

        // log ที่จะเก็บลง db
        $logdata = '[{"old_sap":"'.$current_sap.'", "new_sap":"'.$new_sap.'"}]';

        $log_id = $resp->store(
            $user_in, // มาจากใคร
            'Person Management (จัดการบุคลากร)', // section ของงานอะไร
            'update',  // action
            '(แก้ไขข้อมูล sap id ของบุคลากร) | '.$logdata, // details
            'api' // type
        );

        // สร้าง backup version ของ person model หลังจากสร้าง log แล้วเพื่อ เอาค่า id ของ log เก็บเข้าไปด้วย
        $old['trace_log_id'] = $log_id ?: 0;
        $old['person_id'] = $old['id'];
        $old['record_updated'] = $old['updated_at'];
        PersonVersion::query()->create($old);

        // แก้ไขข้อมูล sap_id ในตาราง user ด้วยถ้า user นั้นเป็น user ที่สามารถเข้าใช้งานระบบหลังบ้านได้
        $user = User::where('sap_id', $current_sap)->first();
        if ( $user ) {
            $user->sap_id = $new_sap;
            try {
                // จัดเก็บค่าใหม่ (Update to DB)
                $user->save();
            } catch (\Exception  $e) {
                $log_message = "แก้ไขข้อมูล sap_id = ". $current_sap ." ในตาราง user ไม่สำเร็จเนื่องจาก => ".$e;
                $resp->store(
                    $user_in, // มาจากใคร
                    'Person Management (จัดการบุคลากร)', // section ของงานอะไร
                    'update',  // action
                    $log_message, // details
                    'api' // type
                );
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Update sap id success'
        ], 200);
    }

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
        $group = (int)$data['group'];

        // สำหรับใช้กับ postman เพื่อทดสอบ
        if( strcmp(config('app.env'), 'local') === 0 || strcmp(config('app.env'), 'dev') === 0 ) {
            $position_division = mb_convert_encoding(trim($data['position_division']), "UTF-8", "auto") ?: null;
            $reward = mb_convert_encoding(trim($data['technic_name']), "UTF-8", "auto") ?: null;
        } else {
        // สำหรับใช้กับ production
            $position_division = iconv('TIS-620', 'UTF-8', trim($data['position_division'])) ?: null;
            $reward = iconv('TIS-620', 'UTF-8', trim($data['technic_name'])) ?: null;
        }

        $user_in = $data['userin'];

        // ข้อมูลที่จะเก็บลงฐานข้อมูล log ในส่วนของข้อมูลที่ได้รับมาจากฝั่ง infomed
        $loginfomed = '[{"sap":"'.$sap.'",
            "division_id":"'.$division_id.'",
            "type":"'.$type.'",
            "group":"'.$group.'",
            "position_division":"'.$position_division.'",
            "technic_name":"'.$reward.'",
            "user_in":"'.$user_in.'"
        }]';

        // Query data with sap_id condition
        $person = Person::where('sap_id', $sap)->first();

        $resp = (new LogManager());

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

        // Update to Object
        $person->division_id = $division_id ?: $person->division_id;
        $person->type = $type ?: $person->type;
        $person->group = $group ?: $person->group;
        $person->position_division = $position_division ?: $person->position_division;
        $person->reward = $reward ?: $person->reward;

        // ตรวจสอบว่าข้อมูลที่ส่งมา update มีอะไรเปลี่ยนแปลงไหม ถ้าเป็นข้อมูลเดิม ไม่ต้องแจ้งทาง slack และให้จบการทำงานเลย
        if( $person->isClean() ) {
            return response()->json([
                'status' => true,
                'message' => 'User is clean update => '. $sap
            ], 200);
        }

        $person->user_previous_act = $person->user_last_act;
        $person->user_last_act = $user_in;

        try {
            // เก็บค่าเก่าก่อนทำการแก้ไข
            $old = $person->getOriginal();
            // จัดเก็บค่าใหม่ (Update to DB)
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

        logger("มีการแก้ไขข้อมูลงานของบุคลากร => {$logslack} มาจาก infomed-api");

        // log ที่จะเก็บลง db
        $logdata = '[{"sap":"'.$sap.'",
            "division_id":"'.$division_id.'",
            "type":"'.$type.'",
            "group":"'.$group.'",
            "position_division":"'.$position_division.'",
            "reward":"'.$reward.'"
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
