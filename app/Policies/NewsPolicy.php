<?php

namespace App\Policies;

use App\{User, Board, News, Website};
use Illuminate\Auth\Access\HandlesAuthorization;

class NewsPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function checkOwner(User $user, \App\News $news)
    {
        $users = $news->website->board->users;
        $is_owner = false;
        foreach ($users as $website_user) {
            if ($user->id === $website_user->id) {
                $is_owner = true;
            }
        }
        return $is_owner;
    }
}