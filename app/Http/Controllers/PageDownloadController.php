<?php

namespace App\Http\Controllers;

use App\Models\PageDownload;
//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class PageDownloadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Download/Index', [
            'items' => PageDownload::query()
                ->when(Request::input('search'), function ($query, $search) {
                    $query->where('title', 'like', "%{$search}%");
                })
                ->orderBy('order_number', 'asc')
                ->paginate(5)
                ->withQueryString()
                ->through(fn ($item) => [
                    'id' => $item->id,
                    'title' => $item->title,
                    'link' => $item->link,
                    'order_number' => $item->order_number,
                    'status' => $item->status
                ]),
            'filters' => Request::only(['search'])
        ]);

        // $items = PageDownload::orderBy('order_number', 'asc')->paginate(5);
        // return Inertia::render('Admin/Download/Index', compact('items'));

        // return Inertia::render('Admin/Download/Index', [
        //     'items' => PageDownload::all()->map(function ($item) {
        //         return [
        //             'id' => $item->id,
        //             'title' => $item->title,
        //             'link' => $item->link,
        //             'status' => $item->status,
        //             'edit_url' => URL::route('admin.download.edit', $item),
        //         ];
        //     }),
        //     'create_url' => URL::route('admin.download.create'),
        // ]);
    }

    public function listAllEnable()
    {
        return PageDownload::where('status', true)->orderBy('order_number', 'asc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Download/DataForm');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        request()->validate([
            'order_number' => ['required', 'integer', 'min:1'],
            'link' => ['required', 'url'],
            'title' => ['required']
        ], [
            'order_number.required' => 'ต้องใส่ลำดับการแสดงผลทุกครั้ง',
            'order_number.min' => 'ต้องใส่เลข 1 เป็นอย่างน้อย',
            'link.required' => 'ต้องใส่ URL ทุกครั้ง',
            'link.url' => 'ใส่ URL ไม่ถูกรูปแบบ',
            'title.required' => 'ต้องใส่รายละเอียดทุกครั้ง',
        ]);

        try {
            PageDownload::create([
                'title'=>Request::input('title'),
                'link'=>Request::input('link'),
                'order_number'=>Request::input('order_number'),
                'status'=>Request::input('status')
            ]);
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เกิดข้อผิดพลาด', 'sysmsg' => 'เกิดข้อผิดพลาดในการจัดเก็บข้อมูล เนื่องจาก' . $e->getMessage()]);
        }

        return Redirect::route('admin.download');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PageDownload  $pageDownload
     * @return \Illuminate\Http\Response
     */
    public function show(PageDownload $pageDownload)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PageDownload  $pageDownload
     * @return \Illuminate\Http\Response
     */
    public function edit(PageDownload $pageDownload)
    {
        //\Log::channel('daily')->info('edit');
        //return $pageDownload;
        return Inertia::render('Admin/Download/DataForm', ['item' => $pageDownload, 'action' => 'update']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PageDownload  $pageDownload
     * @return \Illuminate\Http\Response
     */
    //public function update(Request $request, PageDownload $pageDownload)
    public function update(PageDownload $pageDownload)
    {
        // \Log::channel('daily')->info('update');
        // \Log::channel('daily')->info($pageDownload);

        try {
            $pageDownload->title = Request::input('title');
            $pageDownload->link = Request::input('link');
            $pageDownload->order_number = Request::input('order_number');
            $pageDownload->status = Request::input('status');

            $pageDownload->save();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เกิดข้อผิดพลาด', 'sysmsg' => 'แก้ไขข้อมูลไม่สำเร็จ เนื่องจาก ' . $e->getMessage()]);
        }
        
        return Redirect::route('admin.download');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PageDownload  $pageDownload
     * @return \Illuminate\Http\Response
     */
    public function destroy(PageDownload $pageDownload)
    {
        try {
            PageDownload::whereId((int)$pageDownload->id)->delete();
        } catch (\Exception  $e) {
            return Redirect::back()->withErrors(['msg' => 'เกิดข้อผิดพลาด', 'sysmsg' => 'ไม่สามารถลบข้อมูลหัวข้อดาวน์โหลดได้ เนื่องจาก ' . $e->getMessage()]);
        }

        return Redirect::route('admin.download');
    }
}
