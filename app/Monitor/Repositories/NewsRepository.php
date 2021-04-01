<?php

namespace App\Monitor\Repositories;

use KubAT\PhpSimple\HtmlDomParser;
use App\{News, Board, Website};

class NewsRepository
{
    public function downloadNews($url, $element)
    {
        $news = HtmlDomParser::file_get_html($url)->find($element);
        $unique_news = array_unique($news);
        return $unique_news;
    }

    public function saveNews($news, $website_id)
    {
        News::create([
            'content' => $news['content'],
            'url' => $news['url'],
            'status' => 'unread',
            'website_id' => $website_id,
            'created_at' => new \DateTime(),
        ]);
    }

    public function sortNewsByUnreaded($news)
    {
        $unredNews = array();
        foreach ($news as $key => $row) {
            $unredNews[$key] = $row['unread'];
        }
        return $unredNews;
    }



    public function readNews($id, $user_id)
    {
        $news = News::find($id);
        $news->status = 'read';
        $news->user_id = $user_id;
        $news->updated_at = new \DateTime();
        $news->save();
        return $news;
    }

    public function readAllNews($website_id, $user_id)
    {

        $website = Website::find($website_id);

        $unreadedNews = $website->news()->where('status', 'unread')->get();
        foreach ($unreadedNews as $news) {
            $this->readNews($news->id, $user_id);
        }
    }

    public function checkSaveBoardNews($id)
    {
        $board = Board::find($id);
        $board->updated_at = new \DateTime();
        $board->save();

        $websites = $board->websites()->get();
        foreach ($websites as $website) {
            $website_parts = parse_url($website->url);
            $host =  $website_parts['host'];
            $scheme =  $website_parts['scheme'];

            $news = $this->downloadNews($website->url, $website->selector);

            $newsCount = count($news) * 2;

            $savedNews = News::where('website_id', $website->id)->orderBy('created_at', 'desc')->limit(50)->pluck('content')->toArray();



            $news_url = array();
            foreach ($news as $element) {
                $url = $this->findUrl($element);
                $checkedUrl = $this->checkUrl($url, $host, $scheme);
                $news_url[] = array(
                    "url" => $checkedUrl,
                    "content" => strip_tags($element)
                );
            }
            $differenceNews = array_reverse($this->compareTable($news_url, $savedNews));

            foreach ($differenceNews as $new) {
                $this->saveNews($new, $website->id);
            }
        }
    }
    public function compareTable($news_url, $savedNews)
    {
        $diff = array();
        foreach ($news_url as $news) {
            $s = false;
            foreach ($savedNews as $saved) {
                if ($news['content'] === $saved) {
                    $s = true;
                }
            }
            if ($s === false) {
                $diff[] = $news;
            }
        }
        return $diff;
    }

    public function findUrl($element)
    {
        if ($element->find('[href]')) {
            $node = $element->find('[href]')[0]->href;
            return $node;
        } else if ($element->parent()) {
            $newElement = $element;
            if ($element->parent()->find('[href]')) {
                $node = $element->parent()->find('[href]')[0]->href;
                return $node;
            } else {
                return $this->findUrl($element->parent());
            }
        }
    }
    public function checkUrl($url, $host, $scheme)
    {
        $urlInitial = substr($url, 0, 4);
        if ($urlInitial === "http") {
            return $url;
        } else {
            return "$scheme://$host/$url";
        }
    }

    public function getNewsPreview($url)
    {
        $news = HtmlDomParser::file_get_html($url);

        // $news->find('head')[0]->innertext = "<style>img{max-width: 100%}</style>";
        // $news->find('footer')[0]->innertext = "";
        // $news->find('nav')[0]->innertext = "";


        return $news;
    }
}