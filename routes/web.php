<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

// CONTROLLER
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\AnnounceController;
use App\Http\Controllers\BranchRichTextContentController;
use App\Http\Controllers\BranchEduContentController;
use App\Http\Controllers\BranchMainMenuTemplateController;
use App\Http\Controllers\BranchSubMenuTemplateController;
use App\Http\Controllers\BranchMainMenuController;
use App\Http\Controllers\BranchSubMenuController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\PosterController;
use App\Http\Controllers\PageDownloadController;
use App\Http\Controllers\UserController;

// API
use App\Http\Controllers\API\FileUploadController;
use App\Http\Controllers\API\TraceLogController;
use App\Http\Controllers\InfomedMonitorController;

// MODEL
use App\Models\Announce;
use App\Models\BranchMainMenu;
use App\Models\BranchSubMenu;
use App\Models\Division;
use App\Models\Person;
use App\Models\User;
use App\Models\Agreement;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::post('/webmed_api', [InfomedMonitorController::class, 'index']);

Route::get('/', function () {
    return Inertia::render('Index');
})->name('index');

Route::get('/executive_director', function () {
    return Inertia::render('ExecutiveDirector');
})->name('executive_director');

Route::get('/history', function () {
    return Inertia::render('History');
})->name('history');

Route::get('/department_leader', function () {
    return Inertia::render('DepartmentLeader');
})->name('department_leader');

Route::get('/consultant', function () {
    $listConsultant = Person::select('rname_short_th', 'fname_th', 'lname_th', 'reward', 'image', 'division_id', 'position_division')
                        ->where('status', true)->where('type', 'z')->whereIn('position_academic', [1, 2, 3, 4])
                        ->orderByRaw('convert(fname_th using tis620) asc')->with('division')->get();

    //Log::channel('single')->info($listConsultant);
    return Inertia::render('Consultant', compact('listConsultant'));
})->name('consultant');

Route::get('/org_chart', function () {
    return Inertia::render('OrgChart');
})->name('org_chart');

Route::get('/contact_us', function () {
    return Inertia::render('ContactUs');
})->name('contact_us');

Route::get('/officer', function () {
    #$secretary_sap_id = env('SECRETARY_SAP_ID', '00000000');

    $units = Division::select('slug', 'name_th', 'division_id', 'type')
                        ->where('type', 'u')->orderBy('division_id', 'asc')->get();

    // $secretary = Person::select('slug', 'title_th', 'fname_th', 'lname_th', 'image', 'type')
    //                     ->where('sap_id', $secretary_sap_id)->where('status', true)->first();

    $secretary = Person::select('slug', 'title_th', 'fname_th', 'lname_th', 'image', 'type')
                        ->where('division_id', 19)
                        ->where('profiles->leader', true)->where('status', true)->first();

    return Inertia::render('Officer', compact('units', 'secretary'));
})->name('officer');

Route::get('/post_graduate', function () {
    return Inertia::render('PostGraduate');
})->name('post_graduate');

Route::get('/under_construction', function () {
    return Inertia::render('UnderConstruction');
})->name('under_construction');

Route::get('/branch', function () {
    return Inertia::render('Branch');
})->name('branch');

Route::get('/image_preview', function () {
    return Inertia::render('ImagePreview');
})->name('image_preview');

// ส่วนของการจัดการเมื่อมีการ Login เข้ามาใช้งานระบบ
Route::get('/admin', function () {
    return Inertia::render('Admin/Index');
})->name('admin.index')->middleware('auth', 'can:goto_admin_panel');

//LoginController =>
Route::controller(LoginController::class)
    ->group(function () {
        Route::get('/login', 'index')->name('login');
        Route::post('/login-authen', 'login_authen')->name('login_authen');
        Route::get('/logout', 'destroy')->name('logout');
        //Route::get('/login-as/{name}','loginAs')->name('login_as');
    });


//DivisionController => แสดง เพิ่ม ลบ และ จัดการ เกี่ยวกับ สาขา และ แผนก
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_divisions'])
    ->controller(DivisionController::class)
    ->group(function () {
        Route::get('/division', 'index')->name('admin.division');
        Route::get('/division/create', 'create')->name('admin.division.create');
        Route::get('/division/edit/{division}', 'edit')->name('admin.division.edit');
        Route::post('/division/store', 'store')->name('admin.division.store');
        Route::post('/division/update/{division}', 'update')->name('admin.division.update');
        Route::delete('/division/delete/{id}', 'destroy')->name('admin.division.delete');
    });
Route::get('/admin/list_branch_only', [DivisionController::class, 'listBranchOnly'])->name('admin.list_branch_only');
Route::get('/admin/list_division_all', [DivisionController::class, 'listAll'])->name('admin.list_division_all');

//PosterController => แสดง เพิ่ม ลบ และ จัดการ เกี่ยวกับ รูปภาพ poster ต่างๆ
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_posters'])
    ->controller(PosterController::class)
    ->group(function () {
        Route::get('/poster', 'index')->name('admin.poster');
        Route::get('/poster/create', 'create')->name('admin.poster.create');
        Route::post('/poster/store', 'store')->name('admin.poster.store');
        Route::patch('/poster/update_display_status/{Poster}', 'updatePosterDisplayStatus')->name('admin.poster.update_display_status');
        Route::delete('/poster/delete/{Poster}', 'destroy')->name('admin.poster.delete');
    });
Route::get('/list_enabled_poster', [PosterController::class, 'showListEnabledPoster'])->name('list_enabled_poster');

//GalleryController => แสดง เพิ่ม ลบ และ จัดการ เกี่ยวกับ รูปภาพกิจกรรม ต่างๆ
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_galleries'])
    ->controller(GalleryController::class)
    ->group(function () {
        Route::get('/gallery', 'index_admin')->name('admin.gallery');
        Route::get('/gallery/create', 'create')->name('admin.gallery.create');
        Route::get('/gallery/edit/{Gallery}', 'edit')->name('admin.gallery.edit');
        Route::get('/gallery/check_empty/{event_date}', 'checkGalleryEmpty')->name('admin.gallery.check_empty');
        Route::post('/gallery/store', 'store')->name('admin.gallery.store');
        Route::post('/gallery/update/{Gallery}', 'update')->name('admin.gallery.update');
        Route::patch('/gallery/update_display_status/{Gallery}', 'updateGalleryDisplayStatus')->name('admin.gallery.update_display_status');
        Route::delete('/gallery/delete/{Gallery}', 'destroy')->name('admin.gallery.delete');

        Route::get('/gallery/manage/{Gallery}', 'manageGallery')->name('admin.gallery.manage');
        Route::post('/gallery/upload_image_to_gallery/{event_date}', 'uploadImageToGallery')->name('admin.gallery.upload_image_to_gallery');
        Route::delete('/gallery/delete_image', 'destroyGalleryImage')->name('admin.gallery.delete_image');
    });
Route::get('/list_enabled_gallery', [GalleryController::class, 'showListEnabledGallery'])->name('list_enabled_gallery');
Route::get('/show_gallery/{Gallery}', [GalleryController::class, 'show'])->name('show_gallery');

//PersonController => แสดง เพิ่ม ลบ และ จัดการ เกี่ยวกับ บุคคลากรในภาควิชา
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_person'])
    ->controller(PersonController::class)
    ->group(function () {
        Route::match(['get', 'post'], '/person', 'index')->name('admin.person');
        Route::get('/person_order/{division_slug}', 'index_order')->name('admin.person_order');
        Route::get('/person/create', 'create')->name('admin.person.create');
        Route::get('/person/view/{Person}', 'view')->name('admin.person.view');
        Route::get('/person/edit/{Person}', 'edit')->name('admin.person.edit');
        Route::post('/person/store', 'store')->name('admin.person.store');
        Route::post('/person/update/{Person}', 'update')->name('admin.person.update');
        Route::patch('/person/update_display_status/{Person}', 'updatePersonDisplayStatus')->name('admin.person.update_display_status');
        Route::delete('/person/delete/{id}', 'destroy')->name('admin.person.delete');
        Route::post('/person/update_display_order', 'updatePersonDisplayOrder')->name('admin.person.update_display_order');
        Route::get('/person/list_by_division_and_type', [PersonController::class,'listPersonByDivisionAndType'])->name('admin.person.list_by_division_and_type');
    });
//Route::get('/list_person_by_division_and_type', [PersonController::class,'listPersonByDivisionAndType'])->name('list_person_by_division_and_type');
Route::get('/person/show/{id}', [PersonController::class, 'show'])->name('person.show');
Route::get('/admin/list_person_display_by_division_id/{id}', [PersonController::class, 'listPersonDisplayByDivisionId'])->name('admin.list_person_display_by_division_id');
Route::get('/list_professor_by_division_id/{id}', [PersonController::class, 'listProfessorByDivisionId'])->name('list_professor_by_division_id');
Route::get('/list_doctor_by_division_id/{id}', [PersonController::class, 'listDoctorByDivisionId'])->name('list_doctor_by_division_id');
Route::get('/list_officer_by_division_id/{id}', [PersonController::class, 'listOfficerByDivisionId'])->name('list_officer_by_division_id');

//AnnounceController => แสดง เพิ่ม ลบ และ จัดการ เกี่ยวกับ ข่าวประกาศในภาควิชา
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_announce'])
    ->controller(AnnounceController::class)
    ->group(function () {
        Route::match(['get', 'post'], '/announce', 'index')->name('admin.announce');
        Route::get('/announce/create', 'create')->name('admin.announce.create');
        Route::get('/announce/edit/{Announce}', 'edit')->name('admin.announce.edit');
        Route::post('/announce/store', 'store')->name('admin.announce.store');
        Route::post('/announce/update/{Announce}', 'update')->name('admin.announce.update');
        Route::post('/announce/delete/{id}', 'destroy')->name('admin.announce.delete');
    });

Route::post('/admin/announce/toggle_publish/{Announce}', [AnnounceController::class, 'togglePublish'])->name('admin.announce.toggle_publish')
        ->middleware('auth', 'can:publish_unpublish_announce');
Route::post('/admin/announce/toggle_pin/{Announce}', [AnnounceController::class, 'togglePin'])->name('admin.announce.toggle_pin')
        ->middleware('auth', 'can:pin_unpin_announce');

Route::get('/admin/list_announce_all', [AnnounceController::class, 'listAll'])->name('admin.list_announce_all');
Route::get('/list_announce_show/{record}', [AnnounceController::class, 'listShow'])->name('list_announce_show');
Route::get('/announce_details/{slug}', [AnnounceController::class, 'listMe'])->name('announce_details');
Route::get('/announce_all_publish', function () {
    return Inertia::render('AnnounceAllPublish');
})->name('announce_all_publish');
Route::get('/announce_download_pdf', [AnnounceController::class, 'downloadPdf'])->name('announce_download_pdf');


//BranchMainMenuTemplateController
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_division_content'])
    ->controller(BranchMainMenuTemplateController::class)
    ->group(function () {
        Route::get('/branch_template_editor', 'index')->name('admin.branch_template_editor');
        Route::post('/show_branch_main_menu/{division_id}', 'show')->name('admin.show_branch_main_menu');
        Route::patch('/change_status_branch_main_menu/{BranchMainMenu}', 'changeStatusMenu')->name('admin.change_status_branch_main_menu');
    });
Route::post('/admin/list_branch_main_menu_by_division/{division_id}', [BranchMainMenuTemplateController::class, 'listMainMenuByDivision'])->name('admin.list_branch_main_menu_by_division');

//BranchSubMenuTemplateController => จัดการ การแก้ไข content ของสาขาวิชา
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_division_content'])
    ->controller(BranchSubMenuTemplateController::class)
    ->group(function () {
        Route::patch('/update_content_branch_sub_menu/{BranchSubMenu}', 'update')->name('admin.update_content_branch_sub_menu');
        Route::patch('/change_status_branch_sub_menu/{BranchSubMenu}', 'changeStatusMenu')->name('admin.change_status_branch_sub_menu');
    });
Route::post('/admin/list_branch_sub_menu_by_division/{division_id}', [BranchSubMenuTemplateController::class, 'listSubMenuByDivision'])->name('admin.list_branch_sub_menu_by_division');
Route::get('/branch_details/{slug}', [BranchSubMenuTemplateController::class, 'show'])->name('branch_details');

//BranchMainMenuController
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_division_content'])
    ->controller(BranchMainMenuController::class)
    ->group(function () {
        //
    });

//BranchSubMenuController => จัดการ เมนูย่อย ของการจัดการเนื้อหาสาขาวิชา
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_division_content'])
    ->controller(BranchSubMenuController::class)
    ->group(function () {
    });

//BranchRichTextContentController => จัดการเนื้อหาของ sub_menu ต่างๆที่เป็น rich text เช่น
//ในส่วนของ About (เกี่ยวกับสาขา) และ Edu (งานการเรียนการสอน ที่เป็น rich text)
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_division_content'])
    ->controller(BranchRichTextContentController::class)
    ->group(function () {
        Route::get('/richtext_content_edit/{slug}', 'edit')->name('admin.richtext_content_edit');
        Route::patch('/richtext_content_update/{BranchSubMenu}', 'update')->name('admin.richtext_content_update');
    });
// Route::post('/branch_about_details_edit', function () {
//         return Inertia::render('AboutContentEditor', ['sub_header' => Request::input('sub_header')]);
//     })->name('branch_about_details_edit');

//BranchEduContentController => จัดการเนื้อหาย่อยในส่วนของ Edu (งานการเรียนการสอน)
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_division_content'])
    ->controller(BranchEduContentController::class)
    ->group(function () {
        Route::post('/update_edu_branch_content/{BranchSubMenu}', 'update')->name('admin.update_edu_branch_content');
        Route::get('/edu_content_edit/{slug}', 'edit')->name('admin.edu_content_edit');
        //Route::patch('/about_content_update/{BranchSubMenu}', 'update')->name('admin.about_content_update');
    });
Route::get('/edu_content_download_pdf', [BranchEduContentController::class, 'downloadPdf'])->name('edu_content_download_pdf');

//PageDownloadController => จัดการเนื้อหาในส่วนของ download ที่หน้าแรก
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_download'])
    ->controller(PageDownloadController::class)
    ->group(function () {
        //Route::post('/update_edu_branch_content/{BranchSubMenu}', 'update')->name('admin.update_edu_branch_content');
        Route::get('/download', 'index')->name('admin.download');
        Route::get('/download/create', 'create')->name('admin.download.create');
        Route::post('/download/store', 'store')->name('admin.download.store');
        Route::get('/download/edit/{pageDownload}', 'edit')->name('admin.download.edit');
        Route::post('/download/update/{pageDownload}', 'update')->name('admin.download.update');
        Route::delete('/download/delete/{pageDownload}', 'destroy')->name('admin.download.delete');
    });
Route::get('/download/all', [PageDownloadController::class, 'listAllEnable'])->name('download.all_enable');

//UserController => จัดการผู้ใช้งานในระบบ และกำหนดหน้าที่การทำงาน
Route::prefix('admin')
    ->middleware(['auth', 'can:manage_users'])
    ->controller(UserController::class)
    ->group(function () {
        Route::get('/user', 'index')->name('admin.user.index');
        Route::get('/user/create', 'create')->name('admin.user.create');
        Route::post('/user/store/{person}', 'store')->name('admin.user.store');
        Route::get('/user/edit/{user}', 'edit')->name('admin.user.edit');
        Route::patch('/user/update/{user}', 'update')->name('admin.user.update');
        Route::delete('/user/delete/{user}', 'destroy')->name('admin.user.delete');
    });

//TraceLogController => จัดการ log ต่างๆ ผ่าน UI
Route::prefix('admin')
    ->middleware(['auth', 'can:view_log'])
    ->controller(TraceLogController::class)
    ->group(function () {
        Route::get('/log_info', 'index')->name('admin.log.index');
        // Route::get('/download/create', 'create')->name('admin.download.create');
        // Route::post('/download/store', 'store')->name('admin.download.store');
        // Route::get('/download/edit/{pageDownload}', 'edit')->name('admin.download.edit');
        // Route::post('/download/update/{pageDownload}', 'update')->name('admin.download.update');
        // Route::delete('/download/delete/{pageDownload}', 'destroy')->name('admin.download.delete');
    });

//TraceLogController => จัดการเก็บ log ต่างๆ API
Route::controller(TraceLogController::class)
    ->group(function () {
        Route::post('/log', 'store')->name('log.store');
    });

// Agreement Accept Page
Route::get('/admin/agreement', function () {
    return Inertia::render('Admin/Agreement/Index', ['agreement' => Agreement::orderByDesc('date_effected')->first()]);
})->middleware(['auth'])->name('admin.agreement');

// Agreement Click Accept
Route::post('/admin/accept-agreement', function () {
    request()->user()->agreements()->attach([request()->agreement_id]);

    return redirect()->intended(route('admin.index'));
    //return redirect()->intended('admin.index');
})->middleware(['auth'])->name('admin.accept-agreement');

Route::post('/uploading_file_api', [FileUploadController::class, 'upload'])->name('uploading_file_api');
Route::post('/delete_file_api', [FileUploadController::class, 'delete'])->name('delete_file_api');

// Test Agreement Editor
Route::get('/admin/agreement-editor', function () {
    $agreement = Agreement::find(1);

    //$deltaStr = '{ "ops": [ { "attributes": { "bold": true }, "insert": "hello" }, { "insert": "\n" }, { "attributes": { "italic": true }, "insert": "world" }, { "insert": "\n" }, { "attributes": { "underline": true }, "insert": "test" }, { "insert": "\n" }, { "attributes": { "strike": true }, "insert": "vuequill" }, { "insert": "\n" } ] }';
    // return Inertia::render('TestVueQuill', ['deltaContent' => []]);
    // return Inertia::render('TestVueQuill', ['deltaContent' => json_decode($deltaStr, true)]);
    //return Inertia::render('Admin/Agreement/RichTextEditor', ['deltaContent' => json_decode($deltaContent, true)]);

    return Inertia::render('Admin/Agreement/RichTextEditor', compact('agreement'));
});

// Test VueQuill
// Route::get('test-vuequill', function () {
//     //$deltaContent = Announce::find(1)->detail_delta;
//     $deltaContent = BranchSubMenu::find(164)->detail_delta;
//     //\Log::info($deltaContent);

//     $deltaStr = '{ "ops": [ { "attributes": { "bold": true }, "insert": "hello" }, { "insert": "\n" }, { "attributes": { "italic": true }, "insert": "world" }, { "insert": "\n" }, { "attributes": { "underline": true }, "insert": "test" }, { "insert": "\n" }, { "attributes": { "strike": true }, "insert": "vuequill" }, { "insert": "\n" } ] }';
//     // return Inertia::render('TestVueQuill', ['deltaContent' => []]);
//     // return Inertia::render('TestVueQuill', ['deltaContent' => json_decode($deltaStr, true)]);
//     return Inertia::render('TestVueQuill', ['deltaContent' => json_decode($deltaContent, true)]);
// });


// Route::get('/test-query', function () {
//     $divisionId = request()->fdivision_selected ?? request()->user()->person->division_id;
//     $queryStr = App\Models\Person::query()->where('division_id', '>', 0);
//     if ($search = request()->search) {
//         $queryStr->where(function ($query) use ($search) {
//             $query->where('fname_th', 'like', "%{$search}%")
//                 ->orWhere('lname_th', 'like', "%{$search}%")
//                 ->orWhere('sap_id', 'like', "%{$search}%");
//         });
//     }

//     return $queryStr->with('division')
//     ->orderBy('type')
//     ->orderBy('profiles->leader', 'desc')
//     ->orderBy('display_order', 'asc')
//     ->orderBy('fname_th', 'asc')
//     ->get();


//     return App\Models\Person::query()
//         ->when(
//             request()->fdivision_selected ?? request()->user()->person->division_id,
//             function ($query, $divisionId) {
//                 $search = 'ชัยรัตน์';
//                 $query->where('division_id', $divisionId)
//                     ->where(function ($query) use ($search) {
//                         $query->where('fname_th', 'like', "%{$search}%")
//                             ->orWhere('lname_th', 'like', "%{$search}%")
//                             ->orWhere('sap_id', 'like', "%{$search}%");
//                     });
//             }
//         )->get();

//     return App\Models\Person::query()
//     ->when(\Request::input('fdivision_selected'), function ($query, $division) {
//         $query->where('division_id', $division);
//     }, function ($query) {
//         $user = Auth::user();
//         $query->where('division_id', $user->person->division_id);
//     })
//     ->when(\Request::input('search'), function ($query, $search) {
//         $query->where('fname_th', 'like', "%{$search}%")
//               ->orWhere('lname_th', 'like', "%{$search}%")
//               ->orWhere('sap_id', 'like', "%{$search}%");
//     })
//     ->with('division')
//     ->orderBy('type')
//     ->orderBy('profiles->leader', 'desc')
//     ->orderBy('display_order', 'asc')
//     ->orderBy('fname_th', 'asc')
//     ->get();
// });
