<?php
// สำหรับ บุคคลาการสายสนันสนุน (c) ที่สังกัด สาขา เท่านั้น
namespace Database\Seeders;

use App\Models\Person;
use Facade\FlareClient\Stacktrace\File;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Storage;
use phpDocumentor\Reflection\Types\Boolean;

class PersonDivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run($filename)
    {
        //$contents= array();
        //$contents[] = Storage::get('csv/staff_it.csv');
        //echo count($contents);
        // $line_person = explode("\n", $contents);
        $path = storage_path() . "/app/csv/".$filename;
        //$path = storage_path() . "/app/csv/staff_it.csv";
        $file = FacadesFile::get($path);

        $contents = array();

        foreach (explode("\n", $file) as $key=>$line) {
            $contents[$key] = $line;
        }
  
        for ($i = 0; $i < count($contents); $i++) {
            //echo $contents[$i]."\n";
            // list($division_id, $sap_id, $title_th, $fname_th, $lname_th,$image_name, $manager_flag) = explode(",", $contents[$i]);
            $person = explode(";", $contents[$i]);
            $person_type = 'c';
            $leader = false;

            // echo (int)$person[0]."\n";
            // echo $person[1]."\n";
            // echo $person[2]."\n";
            // echo $person[3]."\n";
            // echo $person[4]."\n";
            // echo $person[5]."\n";
            // echo $person[6]."\n";
            // echo $person[7]."\n";
            // echo $leader."\n";
            // echo "-------------------\n";
                
            Person::create([
                            'division_id' => (int)$person[0],
                            'sap_id' => $person[1],
                            'title_th' => $person[2],
                            'title_en' => 'Mr.',
                            'fname_th' => $person[4],
                            'lname_th' => $person[5],
                            'type' => $person_type,
                            'cert' => "[]",
                            'profiles' => ['leader' => $leader],
                            'user_previous_act' => 'seeder',
                            'user_last_act' => 'seeder'
                            ]);
        }
    }
}
