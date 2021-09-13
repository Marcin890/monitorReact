<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use KubAT\PhpSimple\HtmlDomParser;
use App\Monitor\Repositories\InterpellationRepository;
use App\{Interpellation};

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
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
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

    public function checkIsNew($int_number, $old_interp)
    {
        $is_new = true;
        foreach ($old_interp as $old) {
            if ($old->number === $int_number) {
                $is_new = false;
            }
        }
        return $is_new;
    }

    public function refreshInterpellations(Request $request)
    {


        $element = "td a";
        $page = $request->page;
        $recipient = $request->recipient;
        $type = $request->type;

        $website_url = "https://www.sejm.gov.pl/Sejm9.nsf/interpelacje.xsp?view=$type&page=$page";

        $interpellations = $this->iR->downloadInterpellations($website_url, $element, $recipient);

        $old_interp = Interpellation::all();

        $ints = array();


        foreach ($interpellations as $interp) {

            $int_number = $interp[0]->parent()->parent()->first_child()->plaintext;
            $is_new = $this->checkIsNew($int_number, $old_interp);
            if ($is_new) {
                $int_content = $interp[0]->plaintext;
                $int_url = "https://www.sejm.gov.pl" . $interp[0]->href;
                $int_recipient = $recipient;
                $int_type = $type;
                $int_date = $this->iR->findDate($interp);
                $int_status = "unread";


                $saved_interp = $this->iR->saveInterpellation($int_content, $int_number, $int_url, $int_recipient, $int_type, $int_date, $int_status);



                $ints[] = $saved_interp;

                // return response()->json($ints);
            }
        }

        return response()->json($ints);
    }

    public function getUnreadedInterpellations()
    {
        $interp = Interpellation::all();
        return response()->json($interp);
    }

    public function readInterpellation($id, Request $request)
    {

        $user = $request->user();
        $user_id = $request->user()->id;

        // $newsToCheck = Interpellation::find($id);
        // $this->authorize('checkOwner', $newsToCheck);

        $int = Interpellation::find($id);
        // dd($id);


        // broadcast(new NewsRead($user, $nw))->toOthers();


        $interp = $this->iR->readInterpellation($id, $user_id);


        return response()->json($interp);
    }
}