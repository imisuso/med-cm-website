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
//        return Inertia::render('Admin/LogInfo/Index', [
//            'logs' => TraceLog::query()
//               ->when(Request::input('search'), function ($query, $search) {
//                   $query->where('section', 'like', "%$search%")
//                   ->orWhere('type', 'like', "%$search%")->with('person');
//               })
//               ->with('person')
//               ->orderByDesc('created_at')
//               ->paginate(10)
//               ->withQueryString()
//               ->through(fn ($log) => [
//                   'person' => $log->person,
//                //    'user' => $log->user,
//                   'action' => $log->action,
//                   'section' => $log->section,
//                   'type' => $log->type,
//                   'details' => $log->details,
//                   'created_at' => $log->created_at,
//               ]),
//            'filters' => Request::only(['search', 'page'])
//        ]);

        return Inertia::render('Admin/LogInfo/Index', [
            'logs' => TraceLog::query()
                ->when(Request::input('search'), function ($query, $search) {
                    $query->where('section', 'like', "%$search%")
                        ->orWhere('type', 'like', "%$search%")
                        ->orWhere('action', 'like', "%$search%")
                        ->orWhere('details', 'like', "%$search%" );
                })
                ->with('person')
                ->orderByDesc('created_at')
                ->paginate(10)
                ->withQueryString()
                ->through(fn ($log) => [
                    'id' => $log->id,
                    'person' => $log->person,
                    'user' => $log->user,
                    'action' => $log->action,
                    'section' => $log->section,
                    'type' => $log->type,
                    'details' => $log->details,
                    'created_at' => $log->created_at,
                ]),
            'sections' => TraceLog::select('section')->groupBy('section')->get(),
            'types' => TraceLog::select('type')->groupBy('type')->get(),
            'actions' => TraceLog::select('action')->groupBy('action')->get(),
            'filters' => Request::only(['search', 'page'])
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

        return;
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
