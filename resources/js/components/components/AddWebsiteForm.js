import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddWebsiteForm = ({ addWebsite, editWebsite, testWebsite, web }) => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (data) => {
        if (!web) {
            addWebsite(data);
        } else {
            editWebsite(data);
        }
    };

    return (
        <>
            <h2 className="mt-5">Add website</h2>
            <Form>
                <Form.Group>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        ref={register({
                            required: true,
                            minLength: 3,
                        })}
                        defaultValue={web && web.name}
                    />
                    {errors.name && (
                        <span className="text-danger">
                            At least 3 characters
                        </span>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>URL *</Form.Label>
                    <Form.Control
                        name="url"
                        type="url"
                        ref={register({
                            required: true,
                            pattern:
                                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                        })}
                        defaultValue={web && web.url}
                    />
                    {errors.url && (
                        <span className="text-danger">
                            URL with http or https
                        </span>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Selector *</Form.Label>
                    <Form.Control
                        name="selector"
                        type="text"
                        ref={register({
                            required: true,
                        })}
                        defaultValue={web && web.selector}
                    ></Form.Control>

                    {errors.selector && (
                        <span className="text-danger">
                            At least 3 characters
                        </span>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Priority *</Form.Label>
                    <Form.Control
                        name="priority"
                        type="number"
                        as="select"
                        ref={register({
                            required: true,
                        })}
                        defaultValue={web && web.priority}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </Form.Control>

                    {errors.selector && (
                        <span className="text-danger">Choose priority</span>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        name="id"
                        type="hidden"
                        ref={register}
                        defaultValue={web && web.id}
                    />
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button
                        type="submit"
                        variant="success"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Save Web
                    </Button>
                    <Button variant="info" onClick={handleSubmit(testWebsite)}>
                        Test
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default AddWebsiteForm;
