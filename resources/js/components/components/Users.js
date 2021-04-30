import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import { Button } from "react-bootstrap";
import { URL } from "../../constants/constants";

const Users = ({ boardId, addUserToBoard }) => {
    const url = `${URL}/admin/showUsersOffBoard/${boardId}`;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState();

    const removeUserFromList = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };

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

    const userColumns = [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Add",
            id: "Add",
            Cell: ({ row }) => (
                <>
                    <Button
                        id={row.original.id}
                        onClick={(e) => {
                            addUserToBoard(row.original.id);
                            removeUserFromList(row.original.id);
                        }}
                        variant="success"
                        type="button"
                        size="sm"
                        className="btn-circle"
                    >
                        +
                    </Button>
                </>
            ),
        },
    ];
    return (
        <>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                data && (
                    <>
                        <h1 className="mt-5">Add Users to board</h1>
                        <DataTable data={data} columns={userColumns} />
                    </>
                )
            )}
        </>
    );
};

export default Users;
