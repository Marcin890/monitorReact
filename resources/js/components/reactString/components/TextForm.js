import { Form, Button } from "react-bootstrap";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const TextForm = ({ updateText }) => {
    const { register, handleSubmit, setValue, setError } = useForm();
    const onSubmit = (data) => {
        updateText(data.textToChange);
    };

    useEffect(() => {
        register("textToChange", { required: true });
    }, []);
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
                as="textarea"
                rows={15}
                name="textToChange"
                onChange={(e) => setValue("textToChange", e.target.value)}
                placeholder="Add some text"
            />

            <Button className="mt-3" type="submit">
                Correct
            </Button>
        </Form>
    );
};

export default TextForm;
