import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { BsFillEyeFill, BsCheck, BsLink, BsArrowRight } from "react-icons/bs";

const WebsiteNews = ({
    website,
    filter,
    readNews,
    newsPreview,
    readAllNews
}) => {
    const filterNews = () => {
        if (filter !== "all") {
            return website.news.filter(news => news.status === filter);
        } else {
            return website.news;
        }
    };

    const newsColumn = [
        {
            Header: "Content",
            accessor: "content",
            Cell: ({ row }) => (
                <>
                    <span className="text-break">{row.original.content}</span>
                </>
            )
        },
        {
            Header: "Uploded",
            id: "time",
            accessor: "updated_at",
            Cell: ({ row }) => (
                <>
                    <Moment format="HH:mm">{row.original.updated_at}</Moment>
                    <br />
                    <Moment format="DD.MM">
                        <strong>{row.original.updated_at}</strong>
                    </Moment>
                </>
            )
        },
        {
            Header: "Read",
            id: "status",
            accessor: "status",
            Cell: ({ row }) => (
                <>
                    {row.original.status === "unread" ? (
                        <Button
                            id={row.original.id}
                            onClick={e => readNews(row.original.id)}
                            variant="success"
                            type="button"
                            size="sm"
                            className="btn-circle"
                        >
                            <BsCheck />
                        </Button>
                    ) : (
                        `${
                            row.original.user.name
                                ? row.original.user.name
                                : "read"
                        }`
                    )}
                </>
            )
        },
        {
            Header: "See",
            id: "see",
            accessor: "url",
            Cell: ({ row }) => (
                <>
                    <a href={row.original.url} target="_blank">
                        {" "}
                        <Button
                            id={row.original.id}
                            variant="info"
                            type="button"
                            size="sm"
                            className="btn-circle"
                        >
                            <BsArrowRight />
                        </Button>
                    </a>
                </>
            )
        }
        // {
        //     Header: "Preview",
        //     id: "preview",
        //     accessor: "url",
        //     Cell: ({ row }) => (
        //         <>
        //             <Button
        //                 id={row.original.id}
        //                 variant="primary"
        //                 type="button"
        //                 size="sm"
        //                 onClick={() => newsPreview(row.original.url)}
        //                 className="btn-circle"
        //             >
        //                 <BsFillEyeFill />
        //             </Button>
        //         </>
        //     )
        // }
    ];
    return (
        <>
            <Card className="mt-5">
                <Card.Header>
                    <h4>
                        <a target="_blank" href={website.url}>
                            {website.name}
                        </a>
                    </h4>
                </Card.Header>
                <Card.Body>
                    <Button onClick={() => readAllNews(website.id)}>
                        Read All
                    </Button>
                    <DataTable data={filterNews()} columns={newsColumn} />
                </Card.Body>
            </Card>
        </>
    );
};

export default WebsiteNews;
