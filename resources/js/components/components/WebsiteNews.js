import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { BsFillEyeFill, BsCheckBox, BsLink } from "react-icons/bs";

const WebsiteNews = ({ website, filter, readNews, newsPreview }) => {
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
            accessor: "content"
        },
        {
            Header: "Uploded",
            id: "time",
            accessor: "updated_at",
            Cell: ({ row }) => (
                <>
                    <Moment format="HH:mm DD-MM">
                        {row.original.created_at}
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
                        >
                            <BsCheckBox />
                        </Button>
                    ) : (
                        "readed"
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
                        >
                            <BsLink />
                        </Button>
                    </a>
                </>
            )
        },
        {
            Header: "Preview",
            id: "preview",
            accessor: "url",
            Cell: ({ row }) => (
                <>
                    <Button
                        id={row.original.id}
                        variant="primary"
                        type="button"
                        size="sm"
                        onClick={() => newsPreview(row.original.url)}
                    >
                        <BsFillEyeFill />
                    </Button>
                </>
            )
        }
    ];
    console.log(website);
    return (
        <>
            <Card className="mt-5">
                <Card.Header>
                    <h2>
                        <a target="_blank" href={website.url}>
                            {website.name}
                        </a>
                    </h2>
                </Card.Header>
                <Card.Body>
                    <DataTable data={filterNews()} columns={newsColumn} />
                </Card.Body>
            </Card>
        </>
    );
};

export default WebsiteNews;
