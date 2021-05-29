<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', 'FrontendController@index')->name('home');


Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function () {

    // Boards
    Route::get('/', 'BoardController@index')->name('boardIndex');

    Route::get('/showUserBoards', 'BoardController@showUserBoards')->name('showUserBoards');

    Route::post('/createBoard', 'BoardController@create')->name('createBoard');

    Route::get('/destroyBoard'  . '/{id}', 'BoardController@destroy')->name('destroyBoard');

    Route::get('/showBoard' . '/{id}', 'BoardController@show')->name('showBoard');

    Route::get('/showUsersOffBoard' . '/{id}', 'BoardController@showUsersOffBoard')->name('showUsersOffBoard');


    Route::post('/updateBoard', 'BoardController@update')->name('updateBoard');


    // Websites

    Route::post('/saveWebsite' . '/{website_id?}', 'WebsiteController@create')->name('saveWebsite');

    Route::get('/deleteWebsite' . '/{id}', 'WebsiteController@destroy')->name('deleteWebsite');

    Route::get('/addWebsite' . '/{board_id}', 'WebsiteController@addWebsite')->name('addWebsite');

    Route::get('/editWebsite' . '/{id}', 'WebsiteController@edit')->name('editWebsite');

    Route::post('/updateWebsite', 'WebsiteController@update')->name('updateWebsite');

    Route::post('/testWebsite', 'NewsController@testWebsite')->name('testWebsite');



    // News
    Route::get('/refreshBoardNews' . '/{id}', 'NewsController@refreshBoardNews')->name('refreshBoardNews');

    Route::get('/refreshAllBoardNews', 'NewsController@refreshAllBoardNews')->name('refreshAllBoardNews');

    Route::get('/refreshBoardNewsMain' . '/{id}', 'NewsController@refreshBoardNewsMain')->name('refreshBoardNewsMain');

    Route::get('/showBoardNews' . '/{id}', 'NewsController@showBoardNews')->name('showBoardNews');


    Route::get('/readNews' . '/{id}', 'NewsController@readNews')->name('readNews');

    Route::get('/readAllNews' . '/{id}', 'NewsController@readAllNews')->name('readAllNews');

    Route::get('/articleNews' . '/{id}', 'NewsController@articleNews')->name('articleNews');

    Route::get('/showUserArticles', 'NewsController@showUserArticles')->name('showUserArticles');

    Route::post('/newsPreview', 'NewsController@newsPreview')->name('newsPreview');

    Route::post('/searchNews', 'NewsController@searchNews')->name('searchNews');

    Route::get('/getUnreadedNews', 'NewsController@getUnreadedNews')->name('getUnreadedNews');




    // User
    Route::post('/addUserToBoard', 'BoardController@addUserToBoard')->name('addUserToBoard');

    Route::post('/removeUserFromBoard', 'BoardController@removeUserFromBoard')->name('removeUserFromBoard');
});

Auth::routes();