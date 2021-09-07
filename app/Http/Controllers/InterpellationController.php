<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use KubAT\PhpSimple\HtmlDomParser;
use App\Monitor\Repositories\InterpellationRepository;

class InterpellationController extends Controller
{

    public function __construct(InterpellationRepository $interpellationRepository)
    {
        $this->iR = $interpellationRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
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

    public function refreshInterpellations(Request $request)
    {


        $element = "td a";
        $page = $request->page;
        $recipient = $request->recipient;
        $type = $request->type;

        $website_url = "https://www.sejm.gov.pl/Sejm9.nsf/interpelacje.xsp?view=$type&page=$page";

        $interpellations = $this->iR->downloadInterpellations($website_url, $element, $recipient);

        // dd($interpellations);
        $news_url = array();

        foreach ($interpellations as $interp) {

            $content = $interp[0]->plaintext;
            $url = "https://www.sejm.gov.pl" . $interp[0]->href;

            $news_url[] = array(
                "content" => $content,
                "url" => $url,
                "recipient" => $recipient,
                "type" => $type,
                "date" => $this->iR->findDate($interp)
            );
        }

        return response()->json($news_url);
    }
}