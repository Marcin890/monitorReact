import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddWebsiteForm = ({ addWebsite, editWebsite, web }) => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        if (!web) {
            addWebsite(data);
        } else {
            editWebsite(data);
        }
    };

    return (
        <>
            <h2 className="mt-5">Add website</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        ref={register}
                        defaultValue={web && web.name}
                        // ref={register({ minLength: 3 })}
                    />
                    {errors.name && <span>At least 3 characters</span>}
                    <Form.Label>URL *</Form.Label>
                    <Form.Control
                        name="url"
                        type="url"
                        ref={register}
                        defaultValue={web && web.url}
                        // ref={register({ minLength: 3 })}
                    />
                    {errors.url && <span>At least 3 characters</span>}
                    <Form.Label>Selector *</Form.Label>
                    <Form.Control
                        name="selector"
                        type="text"
                        ref={register}
                        defaultValue={web && web.selector}
                        // ref={register({ minLength: 3 })}
                    />
                    {errors.selector && <span>At least 3 characters</span>}
                    <Form.Control
                        name="id"
                        type="hidden"
                        ref={register}
                        defaultValue={web && web.id}
                        // ref={register({ minLength: 3 })}
                    />
                </Form.Group>

                <Button type="submit" variant="success">
                    Save Web
                </Button>
            </Form>
        </>
    );
};

export default AddWebsiteForm;
