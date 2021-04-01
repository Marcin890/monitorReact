import React, { useState, useEffect } from "react";
import axios from "axios";
import WebsiteItem from "./WebsiteItem";
import UserItem from "./UserItem";
import { Link } from "react-router-dom";
import AddWebsiteForm from "./AddWebsiteForm";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button, Alert, Modal } from "react-bootstrap";
import LoaderData from "./LoaderData";

import DataTable from "./DataTable";
import Users from "./Users";

import {
    BsFillTrashFill,
    BsFillEyeFill,
    BsNewspaper,
    BsPencilSquare
} from "react-icons/bs";

const Board = ({ match }) => {
    const boardId = match.params.id;

    const [data, setData] = useState();
    const [users, setUsers] = useState();
    const [formData, setFormData] = useState(null);
    const [show, setShow] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [alert, setAlert] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const url = `http://localhost:8000/admin/showBoard/${boardId}`;

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

    const addWebsite = web => {
        axios
            .post(`/admin/saveWebsite/${boardId}`, {
                name: web.name,
                url: web.url,
                selector: web.selector,
                boardId: boardId
            })
            .then(response => {
                const website = response.data;
                const { websites, ...restOfData } = data;
                const updatedWebsites = [website, ...websites];
                const updatedData = {
                    ...restOfData,
                    websites: updatedWebsites
                };
                setData(updatedData);
            });
        setAlert({
            view: true,
            text: "Website has been added!",
            variant: "success"
        });
        setTimeout(() => {
            setAlert({});
        }, 5000);
        setShow(false);
    };

    const editWebsite = web => {
        axios
            .post(`/admin/updateWebsite`, {
                name: web.name,
                url: web.url,
                selector: web.selector,
                boardId: web,
                websiteId: web.id
            })
            .then(response => {
                const { websites, ...restOfData } = data;
                const updatedWebsites = websites.map(item => {
                    if (item.id === response.data.id) {
                        return (item = response.data);
                    } else {
                        return item;
                    }
                });
                const updatedData = {
                    ...restOfData,
                    websites: updatedWebsites
                };
                setData(updatedData);
            });
        setAlert({
            view: true,
            text: "Website has been edited!",
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
                        onClick: () => deleteWebsite(id)
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

    const deleteWebsite = id => {
        axios.get(`/admin/deleteWebsite/${id}`).then(response => {
            const { websites, ...restOfData } = data;
            const updatedWebsites = websites.filter(
                website => website.id !== response.data.id
            );
            const updatedData = { ...restOfData, websites: updatedWebsites };
            setData(updatedData);
        });
        setAlert({
            view: true,
            text: "Website has been deleted!",
            variant: "danger"
        });
        setTimeout(() => {
            setAlert({});
        }, 5000);
    };

    const addUserToBoard = id => {
        axios
            .post(`/admin/addUserToBoard`, {
                user_id: id,
                board_id: boardId
            })
            .then(response => {
                const { board_users, ...restOfData } = data;
                const updatedUsers = [response.data, ...board_users];
                const updatedData = {
                    ...restOfData,
                    board_users: updatedUsers
                };
                setData(updatedData);
            });
        setAlert({
            view: true,
            text: "User has been added!",
            variant: "success"
        });
        setTimeout(() => {
            setAlert({});
        }, 5000);
    };

    const removeUserFromBoard = id => {
        axios
            .post(`/admin/removeUserFromBoard`, {
                user_id: id,
                board_id: boardId
            })
            .then(response => {
                const { board_users, ...restOfData } = data;
                const updatedUsers = board_users.filter(
                    user => user.id !== response.data.id
                );
                const updatedData = {
                    ...restOfData,
                    board_users: updatedUsers
                };
                setData(updatedData);
            });
        setAlert({
            view: true,
            text: "User has been removed!",
            variant: "danger"
        });
        setTimeout(() => {
            setAlert({});
        }, 5000);
    };

    const websiteColumns = [
        {
            Header: "Name",
            accessor: "name",
            id: "name",
            Cell: ({ row }) => <>{row.original.name}</>
        },
        {
            Header: "URL",
            accessor: "url",
            id: "url",
            Cell: ({ row }) => (
                <>
                    <a target="_blank" href={row.original.url}>
                        {row.original.url}
                    </a>
                </>
            )
        },
        {
            Header: "Selector",
            accessor: "selector"
        },
        {
            Header: "Edit",
            id: "edit",
            Cell: ({ row }) => (
                <>
                    <Button
                        id={row.original.id}
                        onClick={e => editWebsiteForm(row.original)}
                        variant="info"
                        type="button"
                        size="sm"
                    >
                        <BsPencilSquare />
                    </Button>
                </>
            )
        },
        {
            Header: "Delete",
            id: "delete",
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

    const websiteUsers = [
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Delete",
            id: "delete",
            Cell: ({ row }) => (
                <>
                    <Button
                        id={row.original.id}
                        onClick={e => removeUserFromBoard(row.original.id)}
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

    const editWebsiteForm = website => {
        setFormData(website);
        setShow(true);
    };

    const addWebsiteForm = () => {
        setFormData(null);
        setShow(true);
    };

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
                    <AddWebsiteForm
                        addWebsite={addWebsite}
                        web={formData}
                        editWebsite={editWebsite}
                    />
                </Modal.Body>
            </Modal>
            {/* Users */}
            <Modal
                show={showUsers}
                onHide={() => setShowUsers(false)}
                animation={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Users boardId={boardId} addUserToBoard={addUserToBoard} />
                </Modal.Body>
            </Modal>

            {isError && "aa"}
            {isLoading && <LoaderData />}
            {data && (
                <>
                    <h2 className="mt-5">Websites</h2>
                    <Button
                        variant="success"
                        onClick={addWebsiteForm}
                        className="mt-4"
                    >
                        + Add New Website
                    </Button>

                    <DataTable data={data.websites} columns={websiteColumns} />

                    <h2 className="mt-5">Users</h2>

                    <Button
                        variant="success"
                        className="mt-4"
                        onClick={() => setShowUsers(true)}
                    >
                        + Add New User
                    </Button>

                    <DataTable data={data.board_users} columns={websiteUsers} />
                </>
            )}
        </>
    );
};

export default Board;
