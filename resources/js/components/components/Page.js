import React from "react";
import Boards from "./Boards";
import Contact from "./Contact";
import Board from "./Board";
import News from "./News";
import SearchNews from "./SearchNews";
import Users from "./Users";
import Typography from "../reactString/Typography";
import { Route, Switch } from "react-router-dom";
import UnreadedNews from "./UnreadedNews";
const Page = () => {
    return (
        <>
            <Switch>
                <Route path="/admin" exact component={UnreadedNews} />
                <Route path="/contact" component={Contact} />
                <Route path="/search" component={SearchNews} />
                <Route path="/boards" component={Boards} />
                <Route path="/typography" component={Typography} />
                <Route path="/admin/board/:id" component={Board} />
                <Route path="/admin/showBoardNews/:id" component={News} />
            </Switch>
        </>
    );
};

export default Page;
