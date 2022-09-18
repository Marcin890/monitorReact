import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Icons, Header, Wrapper, Button, NewsTable } from "./News.css";

import { IconCheck, IconRefresh } from "./News.css";
import NewsSearch from "./NewsSearch";
import Information from "./Information";
const News = () => {
    const data = [
        {
            id: 325,
            content:
                "Ustawa o minimalnych wynagrodzeniach nie spełnia naszych oczekiwań",
            status: "unread",
            url: "https://nil.org.pl//aktualnosci/6113-ustawa-o-minimalnych-wynagrodzeniach-nie-spelnia-naszych-oczekiwan",
            website_id: 46,
            user_id: 0,
            created_at: "2022-07-10T08:53:06.000000Z",
            updated_at: "2022-07-10T08:53:06.000000Z",
            website_name: "NIL",
            board_name: "Izby",
            priority: 3,
            board_id: 28,
        },
        {
            id: 326,
            content:
                "Ustną część PES zdają niemal wszyscy lekarze, którzy część pisemną zdają z oceną co najmniej dobrą",
            status: "unread",
            url: "https://nil.org.pl//aktualnosci/6118-ustna-czesc-pes-zdaja-niemal-wszyscy-lekarze-ktorzy-czesc-pisemna-zdaja-z-ocena-co-najmniej-dobra",
            website_id: 46,
            user_id: 0,
            created_at: "2022-07-10T08:53:06.000000Z",
            updated_at: "2022-07-10T08:53:06.000000Z",
            website_name: "NIL",
            board_name: "Izby",
            priority: 3,
            board_id: 28,
        },
        {
            id: 327,
            content:
                "Prezes NRL zwraca się do NROZ ws. medialnych doniesień opublikowanych w artykule w onet.pl",
            status: "unread",
            url: "https://nil.org.pl//aktualnosci/6121-prezes-nrl-zwraca-sie-do-nroz-ws-medialnych-doniesien-opublikowanych-w-artykule-w-onetpl",
            website_id: 46,
            user_id: 0,
            created_at: "2022-07-10T08:53:06.000000Z",
            updated_at: "2022-07-10T08:53:06.000000Z",
            website_name: "NIL",
            board_name: "Izby",
            priority: 3,
            board_id: 28,
        },
    ];

    const news = data.map((news) => {
        return <Information data={news} />;
    });
    return (
        <>
            <Wrapper>
                <Header>
                    <h1>News</h1>
                    <Icons>
                        <IconCheck size={30} />
                        <IconRefresh size={30} />
                    </Icons>
                </Header>
                <NewsSearch />
                <NewsTable>
                    <tr>
                        <th></th>
                    </tr>
                    {news}
                </NewsTable>
            </Wrapper>
        </>
    );
};

export default News;
