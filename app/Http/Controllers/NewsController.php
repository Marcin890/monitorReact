<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use KubAT\PhpSimple\HtmlDomParser;
use App\{Board, Website, News, User};
use \Illuminate\Foundation\Validation\ValidatesRequests;
use App\Monitor\Repositories\NewsRepository;
use App\Monitor\Repositories\BoardRepository;

class NewsController extends Controller
{
    public function __construct(NewsRepository $newsRepository, BoardRepository $boardRepository)
    {
        $this->nR = $newsRepository;
        $this->bR = $boardRepository;
    }

    public function refreshAllBoardNews(Request $request)
    {

        $user = $request->user();
        $boards = $user->boards()->get();

        foreach ($boards as $board) {
            $this->nR->checkSaveBoardNews($board->id);
        }

        $boards2 = $request->user()->boards()->get();
        foreach ($boards2 as $board2) {
            $board2->unreaded_news = $this->bR->countUnreadedBordNews($board2);
            $board2->websites_number = Board::find($board2->id)->websites()->count();
        }

        return response()->json($boards2);
    }



    public function refreshBoardNewsMain($id, Request $request)
    {

        $this->nR->checkSaveBoardNews($id);

        $boards2 = $request->user()->boards()->get();
        foreach ($boards2 as $board2) {
            $board2->unreaded_news = $this->bR->countUnreadedBordNews($board2);
            $board2->websites_number = Board::find($board2->id)->websites()->count();
        }

        return response()->json($boards2);
    }

    public function refreshBoardNews($id)
    {

        $errors = $this->nR->checkSaveBoardNews($id);

        $news = $this->showBoardNews($id);


        $news->errors = $errors;

        return response()->json($news);
    }

    public function showBoardNews($id)
    {
        $board = Board::find($id);
        $websites = $board->websites()->get();

        $newsArray = [];
        foreach ($websites as $website) {

            $currentNews = News::with('user')->where('website_id', $website->id)->get()->toArray();


            $unread = News::where([
                ['website_id', $website->id],
                ['status', 'unread']
            ])->count();


            $websiteArray = $website;
            $websiteArray->news = array_reverse($currentNews);
            $websiteArray->unread = $unread;

            $newsArray = array_merge($newsArray, array($websiteArray));
        }

        $sortByunredNews = $this->nR->sortNewsByUnreaded($newsArray);
        array_multisort($sortByunredNews, SORT_DESC, $newsArray);

        // return view('backend.news', ['board_id' => $id, 'websites' => $newsArray, 'updated' => $board->updated_at]);

        return response()->json([
            'board_id' => $id,
            'websites' => $newsArray,
            'updated' => $board->updated_at
        ]);
    }

    public function showWebsiteNews($id)
    {
    }

    public function readNews($id, Request $request)
    {
        $user = $request->user();
        $user_id = $request->user()->id;

        $newsToCheck = News::find($id);
        $this->authorize('checkOwner', $newsToCheck);

        $news = $this->nR->readNews($id, $user_id);

        return response()->json([
            'news' => $news,
            'user' => $user
        ]);
    }


    public function readAllNews($website_id, Request $request)
    {

        $user_id = $request->user()->id;
        $this->nR->readAllNews($website_id, $user_id);
        $website = Website::find($website_id);

        $news = $website->news;


        return $news;
    }

    public function articleNews($id, Request $request)
    {

        $news = News::find($id);
        $news->status = 'article';
        $news->user_id = $request->user()->id;
        $news->updated_at = new \DateTime();
        $news->save();

        return redirect()->back();
    }

    public function showUserArticles(Request $request)
    {
        $user_id = $request->user()->id;

        $user_articles = News::where([
            ['user_id', $user_id],
            ['status', 'article']
        ])->get()->sortByDesc('updated_at');

        return view('backend.article', ['articles' => $user_articles]);
    }


    public function newsPreview(Request $request)
    {

        $url = $request->url;

        $news = $this->nR->getNewsPreview($url);
        return $news;
        // return response()->json($news);
    }

    public function testWebsite(Request $request)
    {

        $news = $this->nR->downloadNews($request->url, $request->selector);

        $news_array = array();

        foreach ($news as $new) {
            $n = strip_tags($new);
            array_push($news_array, $n);
        }

        return $news_array;
    }

    public function searchNews(Request $request)
    {
        $user = $request->user();

        $search = $request->search;
        $news = $user->boards()->with(['websites.news' => function ($query) use ($search) {
            $query->where('content', 'like', "%$search%");
        }])->get();
        return response()->json($news);
    }

    public function getUnreadedNews(Request $request)
    {
        $user = $request->user();


        $news = $user->boards()->with(['websites.news' => function ($query) {
            $query->where('status', 'unread');
        }])->get();
        return response()->json($news);
    }
}