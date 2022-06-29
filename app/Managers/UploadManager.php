<?php

namespace App\Managers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadManager
{
    public function store(UploadedFile $file, bool $isPublic, string $folder = 'upload')
    {
        $prefix = ($isPublic ? 'public/':'') . $folder;
        return $file->store($prefix);
    }

    // public function delete_dir(bool $isPublic, string $folder = 'upload')
    // {
    //     $prefix = ($isPublic ? 'public/':'') . $folder;
    //     return Storage::deleteDirectory($prefix);
    // }
}
