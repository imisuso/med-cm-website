<?php

namespace App\Http\Controllers;

use App\APIs\InfomedAPI;
//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request;

class InfomedMonitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
        //return response()->json(['name' => 'index']);
        //logger(Request::all());
        $infomed = new InfomedAPI;

        $check_token =  $infomed->checkToken(Request::header('secret'), Request::header('token'));
        //logger($check_token);

        if ($check_token) {
            if (strcmp(Request::header('action'), 'addemp') === 0) {
                $resp = $infomed->insertEmp(Request::input('data_person'));
            } elseif (strcmp(Request::header('action'), 'updemp') === 0) {
                $resp = $infomed->updateEmp(Request::input('data_person'));
            } elseif (strcmp(Request::header('action'), 'updwork') === 0) {
                $resp = $infomed->updateWork(Request::input('data_person'));
            } elseif (strcmp(Request::header('action'), 'delemp') === 0) {
                $resp = $infomed->deleteEmp(Request::input('data_person'));
            }  elseif (strcmp(Request::header('action'), 'updsap') === 0) {
                $resp = $infomed->updSap(Request::input('data_person'));
            } elseif (strcmp(Request::header('action'), 'testlog') === 0) {
                $resp = $infomed->testPersonLog(Request::input('data_person'));
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Not Allow Others Method'
                    ], 405);
            }
        } else {
            $resp = response()->json([
                'status' => false,
                'message' => 'Invalid Credentials'
                ], 401);
        }
        //$resp = $infomed->monitor(Request::input('sap'), Request::input('secret'), Request::input('token'));

        return $resp;
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
