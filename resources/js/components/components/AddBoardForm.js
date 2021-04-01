import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddBoardForm = ({ addBoard }) => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        addBoard(data.name);
    };

    return (
        <>
            <h2 className="mt-5">Create new board</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        ref={register({ minLength: 3 })}
                    />
                    {errors.name && <span>At least 3 characters</span>}
                </Form.Group>

                <Form.Group>
                    <Button variant="success" type="submit">
                        Save Board
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
};

export default AddBoardForm;
