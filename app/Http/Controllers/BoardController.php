<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\{Board, Website, User};
use \Illuminate\Foundation\Validation\ValidatesRequests;
use App\Monitor\Repositories\BoardRepository;
use Vedmant\FeedReader\FeedReader;


class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(BoardRepository $boardRepository, FeedReader $feedReader)
    {
        $this->bR = $boardRepository;
        $this->fR = $feedReader;
    }

    public function index(Request $request)

    {
        $boards = $request->user()->boards()->get();

        foreach ($boards as $board) {
            $board->unreaded_news = $this->bR->countUnreadedBordNews($board);
        }


        return view('backend.index', ['boards' => $boards]);
    }


    public function showUserBoards(Request $request)

    {

        $boards = $request->user()->boards()->get();

        foreach ($boards as $board) {
            $board->unreaded_news = $this->bR->countUnreadedBordNews($board);
        }

        return response()->json($boards);
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
        ]);

        $board = new Board;
        $board->name = $request->name;
        $board->created_at = new \DateTime();
        $board->save();

        $user = $request->user();
        $board->users()->attach($user);

        return response()->json($board);
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
        $board = Board::find($id);
        $websites = $board->websites()->get();
        $board_users = $board->users()->get();


        return response()->json([
            'board_id' => $id,
            'websites' => $websites,
            'board_users' => $board_users,
        ]);
    }

    public function showUsersOffBoard($id)
    {
        $board = Board::find($id);
        $allUsers = $this->bR->getUsersOffBoard($board);


        return response()->json($allUsers);
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



    public function update(Request $request)
    {

        $board = Board::find($request->boardId);
        $this->authorize('checkOwner', $board);
        $board->name = $request->name;
        $board->save();
        return response()->json($board);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $board = Board::find($id);
        $this->authorize('checkOwner', $board);
        $board->delete();


        return response()->json($board);
    }

    public function addUserToBoard(Request $request)
    {
        $user_id = $request->input('user_id');
        $board_id = $request->input('board_id');

        $user = User::find($user_id);
        $board = Board::find($board_id);

        $board->users()->attach($user);

        return response()->json($user);
    }

    public function removeUserFromBoard(Request $request)
    {
        $user_id = $request->input('user_id');
        $board_id = $request->input('board_id');

        $user = User::find($user_id);
        $board = Board::find($board_id);

        $board->users()->detach($user);
        return response()->json($user);
    }
}