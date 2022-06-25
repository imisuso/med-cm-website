<?php

namespace App\Http\Controllers\API;

use App\Models\TraceLog;
use App\Http\Controllers\Controller;
use App\Managers\LogManager;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

//use Illuminate\Http\Request;

class TraceLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Admin/LogInfo/Index', [
             'logs' => TraceLog::with('person')->select('user', 'action', 'details', 'created_at')->orderBy('created_at', 'desc')->get(),
            //'logs' => TraceLog::select('user', 'action', 'details', 'created_at')->orderBy('created_at', 'desc')->get(),
            'sections' => TraceLog::select('section')->groupBy('section')->get(),
            'types' => TraceLog::select('type')->groupBy('type')->get(),
            // 'items' => TraceLog::query()
            //     ->when(Request::input('search'), function ($query, $search) {
            //         $query->where('title', 'like', "%{$search}%");
            //     })
            //     ->orderBy('order_number', 'asc')
            //     ->paginate(5)
            //     ->withQueryString()
            //     ->through(fn ($item) => [
            //         'id' => $item->id,
            //         'title' => $item->title,
            //         'link' => $item->link,
            //         'order_number' => $item->order_number,
            //         'status' => $item->status
            //     ]),
            // 'filters' => Request::only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        // \Log::info(Request::all());
        // \Log::info(Request::user()->sap_id);
        // $user_sap_id = Person::select('sap_id')->where('slug', $request->user)->first();

        //\Log::info(Request::input('data')['section']);
        $resp = (new LogManager)->store(
            Request::user()->sap_id,
            Request::input('data')['section'],
            Request::input('data')['action'],
            Request::input('data')['details'],
            Request::input('data')['type']
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
