import React from "react";
import Boards from "./Boards";
import Contact from "./Contact";
import Board from "./Board";
import News from "./News";
import Users from "./Users";
import { Route, Switch } from "react-router-dom";
const Page = () => {
    return (
        <>
            <Switch>
                <Route path="/admin" exact component={Boards} />
                <Route path="/contact" component={Contact} />
                <Route path="/admin/board/:id" component={Board} />
                <Route path="/admin/showBoardNews/:id" component={News} />
            </Switch>
        </>
    );
};

export default Page;
