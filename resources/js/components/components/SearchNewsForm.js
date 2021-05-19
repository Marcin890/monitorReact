import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SearchNewsForm = ({ searchNews }) => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = (data) => {
        searchNews(data.search);
    };

    return (
        <>
            <Form>
                <Form.Group>
                    {/* <Form.Label>Search News</Form.Label> */}
                    <Form.Control
                        name="search"
                        type="text"
                        ref={register({
                            required: true,
                            minLength: 3,
                        })}
                    />
                    {errors.search && <span>At least 3 characters</span>}
                </Form.Group>
                <Button
                    type="submit"
                    variant="success"
                    onClick={handleSubmit(onSubmit)}
                >
                    Search
                </Button>
            </Form>
        </>
    );
};

export default SearchNewsForm;
