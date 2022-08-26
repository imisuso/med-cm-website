<?php

namespace App\Managers;

use App\Models\TraceLog;

class LogManager
{
    public function store(string $user, string $section, string $action, string $details, string $type = 'info')
    {
        //$prefix = ($isPublic ? 'public/':'') . $folder;
        //return $file->store($prefix);
        $log = new TraceLog;
        $log->user = $user;
        $log->section = $section;
        $log->action = $action;
        $log->details = $details;
        $log->type = $type;

        try {
            $log->save();
            return true;
        } catch (\Exception  $e) {
            return false;
        }

        // try {
        //     $log->save();
        //     return response()->json([
        //         'status' => true,
        //         'message' => 'Store Log Completed'
        //         ], 200);
        // } catch (\Exception  $e) {
        //     return response()->json([
        //         'status' => false,
        //         'message' => 'Store Log Failed'
        //         ], 500);
        // }
    }
}
