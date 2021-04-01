import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBoardForm from "./AddBoardForm";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button, Alert, Modal, Badge } from "react-bootstrap";
import DataTable from "./DataTable";
import { Link } from "react-router-dom";
import {
    BsFillTrashFill,
    BsFillEyeFill,
    BsNewspaper,
    BsPencilSquare,
    BsPlus
} from "react-icons/bs";
import Moment from "react-moment";
import LoaderData from "./LoaderData";

function Boards() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [alert, setAlert] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const url = "http://localhost:8000/admin/showUserBoards";

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios(url);
                setData(result.data);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [url]);

    const addBoard = name => {
        axios
            .post("/admin/createBoard", {
                name: name
            })
            .then(response => {
                setData([response.data, ...data]);
            });
        setAlert({
            view: true,
            text: "Board has been added!",
            variant: "success"
        });
        setTimeout(() => {
            setAlert({});
        }, 5000);
        setShow(false);
    };

    const deleteBoardConfirmation = id => {
        confirmAlert(
            {
                title: "Confirm to submit",
                message: "Are you sure to do this.",
                buttons: [
                    {
                        label: "Yes",
                        onClick: () => deleteBoard(id)
                    },
                    {
                        label: "No",
                        onClick: () => console.log(id)
                    }
                ]
            },
            id
        );
    };

    const deleteBoard = id => {
        axios
            .get(`/admin/destroyBoard/${id}`)
            .then(response =>
                setData(data.filter(data => data.id !== response.data.id))
            );
        setAlert({
            view: true,
            text: "Board has been deleted!",
            variant: "danger"
        });
        setTimeout(() => {
            setAlert({});
        }, 5000);
    };

    const refreshAllBoardNews = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios(`/admin/refreshAllBoardNews`);
            console.log(result.data);
            setData(result.data);
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };

    const columns = [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Refresh",
            id: "time",
            accessor: "updated_at",
            Cell: ({ row }) => (
                <>
                    <Moment format="HH:mm DD-MM">
                        {row.original.updated_at}
                    </Moment>
                </>
            )
        },
        {
            Header: "Unread",
            id: "unreaded_news",
            accessor: "unreaded_news",
            Cell: ({ row }) => (
                <>
                    {row.original.unreaded_news > 0 ? (
                        <Badge variant="danger" pill>
                            {row.original.unreaded_news}
                        </Badge>
                    ) : (
                        <Badge variant="success" pill>
                            {row.original.unreaded_news}
                        </Badge>
                    )}
                </>
            )
        },
        {
            Header: "News",
            id: "aa",
            Cell: ({ row }) => (
                <>
                    <Link to={`/admin/showBoardNews/${row.original.id}`}>
                        <Button variant="success" type="button" size="sm">
                            <BsFillEyeFill />
                        </Button>
                    </Link>
                </>
            )
        },
        {
            Header: "Board",
            id: "bbb",
            Cell: ({ row }) => (
                <>
                    <Link to={`/admin/board/${row.original.id}`}>
                        <Button variant="primary" type="button" size="sm">
                            <BsPencilSquare />
                        </Button>
                    </Link>
                </>
            )
        },
        {
            Header: "Delete",
            id: "cc",
            Cell: ({ row }) => (
                <>
                    <Button
                        id={row.original.id}
                        onClick={e => deleteBoardConfirmation(row.original.id)}
                        variant="danger"
                        type="button"
                        size="sm"
                    >
                        <BsFillTrashFill />
                    </Button>
                </>
            )
        }
    ];
    console.log(data);
    return (
        <>
            {alert.view && (
                <Alert
                    variant={alert.variant}
                    onClose={() => setAlert({})}
                    dismissible
                >
                    {alert.text}
                </Alert>
            )}

            <Modal
                show={show}
                onHide={handleClose}
                animation={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <AddBoardForm addBoard={addBoard} />
                </Modal.Body>
            </Modal>

            {isError && <Alert variant="danger">Something go wrong</Alert>}

            <h2 className="mt-5">Boards</h2>
            <div className="d-flex justify-content-between mt-3">
                <Button variant="success" onClick={handleShow}>
                    <BsPlus /> Add New Board
                </Button>
                <Button onClick={refreshAllBoardNews}>Refresh All</Button>
            </div>
            {isLoading && <LoaderData />}

            {data && (
                <>
                    <DataTable data={data} columns={columns} />
                </>
            )}
        </>
    );
}

export default Boards;
