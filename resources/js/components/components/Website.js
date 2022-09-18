import React from "react";
import { Info, Name, Icons } from "./Website.css";
import { IconEdit, IconDelete } from "./Website.css";
const Website = ({ data }) => {
    console.log(data);
    return (
        <>
            <Info>
                <Name>{data.name}</Name>
                <Icons>
                    <IconEdit size="12" />
                    <IconDelete size="12" />
                </Icons>
            </Info>
        </>
    );
};

export default Website;
