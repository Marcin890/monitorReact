<?php

namespace App\Policies;

use App\{User, Board};
use Illuminate\Auth\Access\HandlesAuthorization;


class BoardPolicy
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

    public function checkOwner(User $user, \App\Board $board)
    {
        $users = $board->users;
        $is_owner = false;
        foreach ($users as $board_user) {
            if ($user->id === $board_user->id) {
                $is_owner = true;
            }
        }
        return $is_owner;
    }
}