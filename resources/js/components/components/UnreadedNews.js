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
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

const url = config.url.API_URL;

const UnreadedNews = () => {
    const [data, setData] = useState();
    const [userBoard, setUserBoard] = useState([]);
    let [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [statistic, setStatistic] = useState({});
    const [filter, setFilter] = useState("unread");
    const [preview, setPreview] = useState("");
    const [show, setShow] = useState(false);
    const [progressPercent, setProgressPercent] = useState();
    const [progressBoard, setProgressBoard] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData(`${url}/admin/getUnreadedNews`);
    }, []);

    const fetchData = (url) => {
        axios
            .get(url)
            .then((response) => {
                const data = prepareNewsData(response.data);
                console.log(response.data);
                setData(data);
            })
            .catch((error) => console.log(error));

        setShow(false);
    };

    const prepareNewsData = (data) => {
        const newsArray = [];
        let userb = [];
        let websiteLength = 0;
        let refreshed = "2000-01-01T18:25:32.000000Z";

        const news = data.map((board) => {
            userb = [...userb, board.id];
            refreshed = board.updated_at > refreshed && board.updated_at;

            return board.websites.map((website) => {
                website.board_name = board.name;
                website.board_id = board.id;

                websiteLength++;
                return website.news.map((neww, index) => {
                    neww.website_name = website.name;
                    neww.board_name = website.board_name;
                    neww.priority = website.priority;
                    neww.board_id = website.board_id;
                    return newsArray.push(neww);
                });
            });
        });
        const newsArraySortDate = newsArray.sort(
            (a, b) => (a.created_at > b.created_at && -1) || 1
        );
        const newsArraySortPriority = newsArraySortDate.sort(
            (a, b) => (a.priority > b.priority && -1) || 1
        );
        setStatistic({
            boards: data.length,
            websites: websiteLength,
            refreshed: refreshed,
        });

        setUserBoard(userb);

        return newsArraySortPriority;
    };

    const readNews = (id) => {
        axios.get(`/admin/readNews/${id}`).then((response) => {
            const uptatedData = data.filter(
                (news) => news.id != response.data.news.id
            );
            setData(uptatedData);
        });
    };

    const refreshAllBoardNews = async () => {
        setIsLoading(true);
        setProgressPercent(1);
        let round = 0;
        const length = userBoard.length;
        for (const board of userBoard) {
            console.log(`get ${board}`);
            await fetch(`${url}/admin/refreshBoardNews/${board}`)
                .catch((error) => console.log("There was a problem!", error))
                .then(() => {
                    console.log(`download ${board}`);
                    round = round + 1;
                    setProgressPercent(Math.trunc((100 * round) / length));
                });
        }

        console.log(`FetchAll`);
        fetchData(`${url}/admin/getUnreadedNews`);
        setProgressPercent(null);
        setIsLoading(false);
    };

    const columns = [
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
            Header: "Content",
            accessor: "content",
            Cell: ({ row }) => (
                <>
                    <a href={row.original.url} target="_blank">
                        <span className="text-br">{row.original.content}</span>
                    </a>
                </>
            ),
        },
        {
            Header: "Board",
            accessor: "board_name",
            Cell: ({ row }) => (
                <>
                    <Link to={`/admin/board/${row.original.board_id}`}>
                        <span className="text-br">
                            {row.original.board_name}
                        </span>
                    </Link>
                </>
            ),
        },
        {
            Header: "Website",
            accessor: "website_name",
            Cell: ({ row }) => (
                <>
                    <span className="text-br">{row.original.website_name}</span>
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

        {
            Header: "Read",
            id: "id",
            accessor: "id",
            Cell: ({ row }) => (
                <>
                    <Button
                        id={row.original.id}
                        onClick={(e) => readNews(row.original.id)}
                        variant="success"
                        type="button"
                        size="sm"
                        className="btn-circle"
                    >
                        <BsCheck />
                    </Button>
                </>
            ),
        },
    ];
    console.log(`UserBoard: ${userBoard}`);
    console.log(data);

    const now = 50;
    const progressInstance = (
        <ProgressBar
            variant="info"
            now={progressPercent}
            label={`${progressPercent}%`}
        />
    );
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mt-5">
                <h2>News</h2>
                <div>
                    <Button onClick={refreshAllBoardNews}>Refresh </Button>
                </div>
            </div>
            {statistic && (
                <div className="d-flex justify-content-between mt-2">
                    <p>
                        <small>Boards: {statistic.boards}</small>&nbsp;&nbsp;
                        <small>Websites: {statistic.websites}</small>
                    </p>
                    <p>
                        <small>
                            Last:&nbsp;
                            <Moment
                                format="DD.MM HH:mm "
                                date={statistic.refreshed}
                            ></Moment>
                        </small>
                    </p>
                </div>
            )}
            <div className="mt-3">{progressPercent && progressInstance}</div>
            {isLoading && <LoaderData />}
            {data && (
                <>
                    <DataTable data={data} columns={columns} />
                </>
            )}
        </>
    );
};

export default UnreadedNews;
