import React from "react";
const DeleteConfirmation = () => {
    return (
        <>
            <div className="">
                <p>Do you want delete</p>
                <div className="d-flex">
                    <button className="btn btn-md btn-danger">Yes</button>
                    <button className="btn btn-md btn-primary">No</button>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirmation;
