import React from "react";
import {
    InformationWrapper,
    Date,
    Content,
    Board,
    Website,
    Bookmark,
    Link,
    Read,
} from "./Information.css";
const Information = ({ data }) => {
    const changeDateFormat = (isoDate) => {
        const date = new window.Date(isoDate);
        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}.${
            date.getMonth() + 1
        }`;
    };
    return (
        <>
            <InformationWrapper>
                <Date>{changeDateFormat(data.created_at)}</Date>
                <Content>
                    <a href={data.url} target="blank">
                        {data.content}
                    </a>
                </Content>
                <Board>{data.board_name}</Board>
                <Website>{data.website_name}</Website>
                <td>
                    <Bookmark size={16} />
                </td>

                <td>
                    <Read size={16} />
                </td>
            </InformationWrapper>
        </>
    );
};

export default Information;
