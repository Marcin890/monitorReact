import React from "react";
import Boards from "./Boards";
import Contact from "./Contact";
import Board from "./Board";
import News from "./News";
import Interpellation from "./Interpellation";
import SearchNews from "./SearchNews";
import Users from "./Users";
import Typography from "../reactString/Typography";
import Slider from "../slider/Slider";
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
                <Route path="/slider" component={Slider} />
                <Route path="/admin/board/:id" component={Board} />
                <Route path="/admin/showBoardNews/:id" component={News} />
                <Route path="/interpellation" component={Interpellation} />
            </Switch>
        </>
    );
};

export default Page;
