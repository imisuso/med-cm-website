<?php

namespace App\Managers;

use Illuminate\Http\UploadedFile;

class UploadManager
{
    public function store(UploadedFile $file, bool $isPublic, string $folder = 'upload')
    {
        $prefix = ($isPublic ? 'public/':'') . $folder;
        return $file->store($prefix);
    }
}
