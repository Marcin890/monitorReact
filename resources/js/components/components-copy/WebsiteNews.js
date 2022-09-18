import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { BsFillEyeFill, BsCheck, BsLink, BsArrowRight } from "react-icons/bs";

const WebsiteNews = ({ website, filter, readNews, readAllNews }) => {
    const filterNews = () => {
        if (filter !== "all") {
            return website.news.filter((news) => news.status === filter);
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
            ),
        },
        {
            Header: "Uploded",
            id: "time",
            accessor: "updated_at",
            Cell: ({ row }) => (
                <>
                    <Moment
                        format="HH:mm"
                        date={row.original.updated_at}
                    ></Moment>
                    <br />
                    <Moment
                        format="DD.MM"
                        date={row.original.updated_at}
                    ></Moment>
                </>
            ),
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
                            onClick={(e) =>
                                readNews(row.original.id, website.id)
                            }
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
            ),
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
            ),
        },
    ];

    return (
        <>
            <Accordion
                key={website.id}
                defaultActiveKey={website.unread > 0 ? website.id : null}
            >
                <Card className="mt-2">
                    <Accordion.Toggle eventKey={website.id} as={Card.Header}>
                        <div className="d-flex justify-content-between">
                            <div>{website.name}</div>
                            <div>
                                {website.unread > 0 ? (
                                    <Button
                                        variant="outline-danger"
                                        type="button"
                                        size="sm"
                                        className="btn-circle mr-2"
                                    >
                                        {website.unread}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline-success"
                                        type="button"
                                        size="sm"
                                        className="btn-circle mr-2"
                                    >
                                        {website.unread}
                                    </Button>
                                )}
                                <a target="_blank" href={website.url}>
                                    <Button
                                        variant="info"
                                        type="button"
                                        size="sm"
                                        className="btn-circle mr-2"
                                    >
                                        <BsLink />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={website.id}>
                        <Card.Body>
                            <Button onClick={() => readAllNews(website.id)}>
                                Read All
                            </Button>
                            <DataTable
                                data={filterNews()}
                                columns={newsColumn}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    );
};

export default WebsiteNews;
