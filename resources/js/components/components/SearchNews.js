import React, { useState, useEffect } from "react";
import axios from "axios";
import WebsiteNews from "./WebsiteNews";
import SearchNewsForm from "./SearchNewsForm";
import { Button, Modal } from "react-bootstrap";
import Filter from "./Filter";
import LoaderData from "./LoaderData";
import Iframe from "react-iframe";
import { config } from "../../constants/constants";
import DataTable from "./DataTable";
import Moment from "react-moment";
import { BsFillEyeFill, BsCheck, BsLink, BsArrowRight } from "react-icons/bs";
const url = config.url.API_URL;

const SearchNews = () => {
    const [data, setData] = useState();
    let [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [filter, setFilter] = useState("unread");
    const [preview, setPreview] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const searchNews = (search) => {
        axios
            .post(`${url}/admin/searchNews`, {
                search: search,
            })
            .then((response) => {
                const data = prepareNewsData(response.data);
                setData(data);
            })
            .catch((error) => showError(error));

        setShow(false);
    };

    const prepareNewsData = (data) => {
        const newsArray = [];
        const news = data.map((board) => {
            return board.websites.map((website) => {
                website.board_name = board.name;
                return website.news.map((neww, index) => {
                    neww.website_name = website.name;
                    neww.board_name = website.board_name;
                    return newsArray.push(neww);
                });
            });
        });
        return newsArray;
    };

    const showNews = () => {
        return data.map((board) => {
            return board.websites.map((website) => {
                return website.news.map((neww, index) => {
                    return <p key={index}>{neww.content}</p>;
                });
            });
        });
    };

    const columns = [
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
            Header: "Website",
            accessor: "website_name",
            Cell: ({ row }) => (
                <>
                    <span className="text-break">
                        {row.original.website_name}
                    </span>
                </>
            ),
        },
        {
            Header: "Board",
            accessor: "board_name",
            Cell: ({ row }) => (
                <>
                    <span className="text-break">
                        {row.original.board_name}
                    </span>
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
                    {row.original.status === "unread"
                        ? `${"unread"}`
                        : `${"read"}`}
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
    console.log(data);
    return (
        <>
            <h2 className="mt-5">Search</h2>
            <SearchNewsForm searchNews={searchNews} />
            {data && (
                <>
                    <DataTable data={data} columns={columns} />
                </>
            )}
        </>
    );
};

export default SearchNews;
