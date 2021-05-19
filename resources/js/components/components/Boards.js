import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBoardForm from "./AddBoardForm";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button, Alert, Modal, Badge } from "react-bootstrap";
import DataTable from "./DataTable";
import { Link } from "react-router-dom";
import { config } from "../../constants/constants";
import {
    BsFillTrashFill,
    BsFillEyeFill,
    BsNewspaper,
    BsPencilSquare,
    BsPlus,
    BsWrench,
    BsArrowRepeat,
} from "react-icons/bs";
import Moment from "react-moment";
import LoaderData from "./LoaderData";

function Boards() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [alert, setAlert] = useState({});
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const url = config.url.API_URL;
    useEffect(() => {
        fetchData(`${url}/admin/showUserBoards`);
    }, []);

    const fetchData = async (url) => {
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

    const addBoard = (name) => {
        axios
            .post("/admin/createBoard", {
                name: name,
            })
            .then((response) => {
                setData([response.data, ...data]);
                showAlert("Board has been added", "success");
            })
            .catch((error) => showError(error));
        setShow(false);
    };

    const editBoard = (board) => {
        axios
            .post(`/admin/updateBoard`, {
                name: board.name,
                boardId: board.id,
            })
            .then((response) => {
                const updateBoards = data.map((item) => {
                    if (item.id === response.data.id) {
                        item.name = response.data.name;
                        return item;
                    } else {
                        return item;
                    }
                });
                setData(updateBoards);
                showAlert("Board has been edited", "success");
            })
            .catch((error) => showError(error));
        setShow(false);
    };

    const deleteBoard = (id) => {
        axios
            .get(`/admin/destroyBoard/${id}`)
            .then((response) =>
                setData(data.filter((data) => data.id !== response.data.id))
            );
        showAlert("Board has been deleted", "danger");
    };

    const showError = (error) => {
        if (error.response) {
            showAlert("Error of response", "danger");
        } else if (error.request) {
            showAlert("Error of request", "danger");
        } else {
            showAlert("Something go wrong", "danger");
        }
    };

    const deleteBoardConfirmation = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Modal
                        show={true}
                        onHide={handleClose}
                        animation={true}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <h1>Are you sure?</h1>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-between">
                                <Button
                                    onClick={onClose}
                                    variant="info"
                                    type="button"
                                    size="sm"
                                >
                                    No
                                </Button>
                                <Button
                                    onClick={() => {
                                        deleteBoard(id);
                                        onClose();
                                    }}
                                    variant="danger"
                                    type="button"
                                    size="sm"
                                >
                                    Yes, Delete it!
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                );
            },
        });
    };

    const showAlert = (text, variant) => {
        setAlert({
            view: true,
            text: `${text}`,
            variant: variant,
        });
        setTimeout(() => {
            setAlert({});
        }, 5000);
    };

    const refreshAllBoardNews = async () => {
        fetchData(`/admin/refreshAllBoardNews`);
    };

    const refreshBoardNewsMain = async (boardId) => {
        fetchData(`${url}/admin/refreshBoardNewsMain/${boardId}`);
    };

    const editBoardForm = (board) => {
        setFormData(board);
        setShow(true);
    };

    const addBoardForm = () => {
        setFormData(null);
        setShow(true);
    };

    const columns = [
        {
            Header: "Name",
            id: "name",
            accessor: "name",
            Cell: ({ row }) => (
                <>
                    {row.original.name} {`\(${row.original.websites_number}\)`}{" "}
                </>
            ),
        },
        {
            Header: "Refr.",
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
            Header: "News",
            id: "unreaded_news",
            accessor: "unreaded_news",
            Cell: ({ row }) => (
                <>
                    <Link to={`/admin/showBoardNews/${row.original.id}`}>
                        {row.original.unreaded_news > 0 ? (
                            <Button
                                variant="outline-danger"
                                type="button"
                                size="sm"
                                className="btn-circle"
                            >
                                {row.original.unreaded_news}
                            </Button>
                        ) : (
                            <Button
                                variant="outline-success"
                                type="button"
                                size="sm"
                                className="btn-circle"
                            >
                                {row.original.unreaded_news}
                            </Button>
                        )}
                    </Link>
                </>
            ),
        },

        {
            Header: "Board",
            id: "bbb",
            Cell: ({ row }) => (
                <>
                    <Link to={`/admin/board/${row.original.id}`}>
                        <Button
                            variant="primary"
                            type="button"
                            size="sm"
                            className="btn-circle"
                        >
                            <BsFillEyeFill />
                        </Button>
                    </Link>
                </>
            ),
        },
        {
            Header: "Edit",
            id: "edit",
            Cell: ({ row }) => (
                <>
                    <Button
                        id={row.original.id}
                        onClick={(e) => editBoardForm(row.original)}
                        variant="info"
                        type="button"
                        size="sm"
                        className="btn-circle"
                    >
                        <BsWrench />
                    </Button>
                </>
            ),
        },
        {
            Header: "Delete",
            id: "cc",
            Cell: ({ row }) => (
                <>
                    <Button
                        id={row.original.id}
                        onClick={(e) =>
                            deleteBoardConfirmation(row.original.id)
                        }
                        variant="danger"
                        type="button"
                        size="sm"
                        className="btn-circle"
                    >
                        <BsFillTrashFill />
                    </Button>
                </>
            ),
        },
        {
            Header: "Refr.",
            id: "refres",
            Cell: ({ row }) => (
                <>
                    <Button
                        id={row.original.id}
                        onClick={(e) => refreshBoardNewsMain(row.original.id)}
                        variant="success"
                        type="button"
                        size="sm"
                        className="btn-circle"
                    >
                        <BsArrowRepeat />
                    </Button>
                </>
            ),
        },
    ];
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
                    <AddBoardForm
                        addBoard={addBoard}
                        boardToEdit={formData}
                        editBoard={editBoard}
                    />
                </Modal.Body>
            </Modal>

            {isError && <Alert variant="danger">Something go wrong</Alert>}

            <h2 className="mt-5">Boards</h2>
            <div className="d-flex justify-content-between mt-3">
                <Button variant="success" onClick={addBoardForm}>
                    <BsPlus /> Add Board
                </Button>
                {/* <Button onClick={refreshAllBoardNews}>Refresh </Button> */}
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
