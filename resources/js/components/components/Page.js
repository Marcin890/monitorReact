import React from "react";
import NewsWrapper from "./NewsWrapper";

import { Route, Switch } from "react-router-dom";

const Page = ({ secondMenu }) => {
    return (
        <>
            <Switch>
                <Route
                    path="/admin"
                    exact
                    component={() => <NewsWrapper secondMenu={secondMenu} />}
                />
            </Switch>
        </>
    );
};

export default Page;
