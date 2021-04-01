<?php

namespace App\Monitor\Repositories;

use KubAT\PhpSimple\HtmlDomParser;
use App\{User};

class BoardRepository
{
    public function getUsersOffBoard($board)
    {
        $usersOffBoard = User::whereNotIn('id', $board->users()->pluck('id'))->get();

        return $usersOffBoard;
    }

    public function countUnreadedBordNews($board)
    {
        $unreaded_news  = 0; {
            $websites = $board->websites()->get();
            $websiteUnreadedNews = $this->countUnreadedWebsiteNews($websites);

            $unreaded_news += $websiteUnreadedNews;
        }
        return $unreaded_news;
    }

    public function countUnreadedWebsiteNews($websites)
    {
        $unreaded_news  = 0;
        foreach ($websites as $website) {
            $count = $website->news()->where('status', 'unread')->count();
            $unreaded_news += $count;
        }
        return $unreaded_news;
    }
}