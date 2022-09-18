import React from "react";
import { Input, Search } from "./NewsSearch.css";

const NewsSearch = () => {
    return (
        <Search>
            <Input type="text" placeholder="Search" />
        </Search>
    );
};

export default NewsSearch;
