import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddBoardForm = ({ addBoard, editBoard, boardToEdit }) => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (data) => {
        if (!boardToEdit) {
            addBoard(data.name);
        } else {
            editBoard(data);
        }
    };

    return (
        <>
            <h2 className="mt-5">Create new board</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={boardToEdit && boardToEdit.name}
                        name="name"
                        ref={register({
                            required: true,
                            minLength: 3,
                        })}
                    />
                    {errors.name && (
                        <span className="text-danger">
                            At least 3 characters
                        </span>
                    )}
                    <Form.Control
                        name="id"
                        type="hidden"
                        ref={register}
                        defaultValue={boardToEdit && boardToEdit.id}
                        // ref={register({ minLength: 3 })}
                    />
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
