import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { config } from "../../constants/constants";
import axios from "axios";
import LoaderData from "./LoaderData";
import DataTable from "./DataTableInterp.js";
import InterpollationFilters from "./InterpollationFilters";
import Moment from "react-moment";
import { BsFillEyeFill, BsCheck, BsLink, BsArrowRight } from "react-icons/bs";
import ProgressBar from "react-bootstrap/ProgressBar";

const url = config.url.API_URL;

const Interpellation = () => {
    const [data, setData] = useState();

    const [filter, setFilter] = useState({
        status: "unread",
        type: "all",
        recipient: "minister zdrowia",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(5);
    const [recipient, setRecipient] = useState("minister zdrowia");
    const [type, setType] = useState(1);
    const [progressPercent, setProgressPercent] = useState();

    const [show, setShow] = useState(false);
    const [isInit, setIsInit] = useState(false);
    const [progressBoard, setProgressBoard] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log("fetch");
        fetchData(`${url}/admin/getUnreadedInterpellations`);
    }, []);

    const fetchData = (url) => {
        axios
            .get(url)
            .then((response) => {
                const data = prepareData(response.data);
                console.log(data);
                setData(data);
                setShow(false);
                setIsInit(true);
            })
            .catch((error) => console.log(error));
    };

    const prepareData = (data) => {
        const sortData = data.sort(function (a, b) {
            return Date.parse(b.date) - Date.parse(a.date);
        });

        return sortData;
    };

    const updateInterpellation = (id) => {
        const uptatedData = data.map((int) => {
            if (int.id == id) {
                int.status = "read";
                return int;
            } else {
                return int;
            }
        });
        setData(uptatedData);
        // console.log(uptatedData);
    };

    const readInterpellation = (id) => {
        axios.get(`/admin/readInterpellation/${id}`).then((response) => {
            updateInterpellation(response.data.id);
        });
    };

    const refreshInterpellations = async () => {
        setIsLoading(true);
        setProgressPercent(1);
        let round = 0;
        const length = max - min;
        let resp = [];
        for (let i = min; i < max; i++) {
            await axios
                .post(`${url}/admin/refreshInterpellations`, {
                    recipient: recipient,
                    type: type,
                    page: i,
                })
                .then((response) => {
                    console.log(response.data);
                    resp.push(...response.data);
                    round = round + 1;
                    setProgressPercent(Math.trunc((100 * round) / length));
                })
                .catch((error) => console.log(error));
        }
        fetchData(`${url}/admin/getUnreadedInterpellations`);
        setProgressPercent(null);
        setIsLoading(false);
    };

    const columns = [
        {
            Header: "Answered",
            id: "date",
            accessor: "date",
            headerClassName: "uuu",
            Cell: ({ row }) => (
                <>
                    <span className={`text-br interp-${row.original.type}`}>
                        {row.original.date}
                    </span>
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
            Header: "Recipient",
            accessor: "recipient",
            Cell: ({ row }) => (
                <>
                    <span className="text-br">{row.original.recipient}</span>
                </>
            ),
        },
        // {
        //     Header: "Status",
        //     accessor: "status",
        //     id: "status",
        //     name: "status",
        //     selector: (row) => row.status,
        // Cell: ({ row }) => (
        //     <>
        //         <span className="text-br">{row.original.status}</span>
        //     </>
        // ),
        // },
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
                        onClick={(e) => readInterpellation(row.original.id)}
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
    const progressInstance = (
        <ProgressBar
            variant="info"
            now={progressPercent}
            label={`${progressPercent}%`}
        />
    );

    const filterData = (data) => {
        let filtredData = data;

        filter.status !== "all" &&
            (filtredData = data.filter((d) => d.status === filter.status));

        filter.type !== "all" &&
            (filtredData = filtredData.filter(
                (d) => d.type.toString() === filter.type
            ));
        filter.recipient !== "all" &&
            (filtredData = filtredData.filter(
                (d) => d.recipient.toString() === filter.recipient
            ));

        return filtredData;
    };

    console.log(filter);
    return (
        <>
            <h2 className="mt-5">Interpellations</h2>
            {isLoading && <LoaderData />}
            <div className="row no-gutters mt-5">
                <div className="col-sm-5">
                    <Form.Control
                        as="select"
                        onChange={(e) => setRecipient(e.target.value)}
                    >
                        <option value="minister zdrowia">
                            minister zdrowia
                        </option>
                        <option value="prezes Rady Ministrów">
                            prezes Rady Ministrów
                        </option>
                        <option value="minister edukacji i nauki">
                            minister edukacji i nauki
                        </option>
                        <option value="minister finansów">
                            minister finansów
                        </option>
                        <option value="minister spraw zagranicznych">
                            minister spraw zagranicznych
                        </option>
                        <option value="minister sprawiedliwości">
                            minister sprawiedliwości
                        </option>
                        <option value="minister spraw wewnętrznych i administracji">
                            minister spraw wewnętrznych i administracji
                        </option>
                    </Form.Control>
                </div>
                <div className="col-sm-3">
                    <Form.Control
                        as="select"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="1">Interpelacje</option>
                        <option value="2">Zapytania</option>
                        <option value="3">Pytania</option>
                    </Form.Control>
                </div>
                <div className="col-sm-1">
                    <Form.Control
                        type="number"
                        onChange={(e) => setMin(Number(e.target.value))}
                        value={min}
                    />
                </div>
                <div className="col-sm-1">
                    <Form.Control
                        type="number"
                        onChange={(e) => setMax(Number(e.target.value))}
                        value={max}
                    />
                </div>
                <div className="col-sm-2">
                    <Button onClick={refreshInterpellations}>Get </Button>
                </div>
            </div>
            <div className="mt-3">
                <InterpollationFilters setFilter={setFilter} filter={filter} />
            </div>
            <div className="mt-3">{progressPercent && progressInstance}</div>
            {isLoading && <LoaderData />}
            {data && (
                <>
                    <DataTable
                        // data={data.filter((d) => d.status === "unread")}
                        data={filterData(data)}
                        columns={columns}
                    />
                </>
            )}
        </>
    );
};

export default Interpellation;
