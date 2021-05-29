<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Website};
use \Illuminate\Foundation\Validation\ValidatesRequests;
use App\Monitor\Repositories\NewsRepository;


class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(NewsRepository $newsRepository)
    {
        $this->nR = $newsRepository;
    }
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $this->validate($request, [
            'name' => "required|string",
            'url' => "required|url",
            'selector' => "required|string",
        ]);

        $savedWebsite = Website::create([
            'name' => $request->name,
            'url' => $request->url,
            'selector' => $request->selector,
            'board_id' => $request->boardId,
            'created_at' => new \DateTime(),
        ]);

        // $this->nR->checkSaveWebsiteNews($savedWebsite->id);


        return response()->json($savedWebsite);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
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
        $website = Website::find($id);

        return view('backend.editWebsite', ['website' => $website]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $website = Website::find($request->websiteId);
        $this->authorize('checkOwner', $website);
        $website->name = $request->name;
        $website->url = $request->url;
        $website->selector = $request->selector;
        $website->save();



        return response()->json($website);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $website = Website::find($id);
        $this->authorize('checkOwner', $website);
        $website->delete();
        return response()->json($website);
    }

    public function addWebsite($board_id)
    {

        return view('backend.addWebsite', ['board_id' => $board_id]);
    }
}