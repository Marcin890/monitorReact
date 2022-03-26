import { Form, Button } from "react-bootstrap";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import TextareaAutosize from "react-textarea-autosize";
// aaa
import TextareaAutosize from "react-autosize-textarea";

const TextForm = ({ updateText }) => {
    const { register, handleSubmit, setValue, setError } = useForm();
    const onSubmit = (data, id) => {
        // console.log("aa", data);
        updateText(data.textToChange, id);
    };

    const clearForm = () => {
        setValue("textToChange", "&nbsp;");
        updateText("");
    };

    useEffect(() => {
        register("textToChange", { required: true });
    }, []);

    return (
        <Form>
            <div className="d-flex justify-content-between align-items-center">
                <Button
                    type="submit"
                    id="correct"
                    onClick={handleSubmit((data) => onSubmit(data, "correct"))}
                >
                    Correct
                </Button>
                <Button
                    type="submit"
                    id="pap"
                    onClick={handleSubmit((data) => onSubmit(data, "pap"))}
                    variant="info"
                >
                    PAP
                </Button>

                <Button type="reset" onClick={clearForm} variant="danger">
                    Clear
                </Button>
            </div>

            <TextareaAutosize
                onChange={(e) => setValue("textToChange", e.target.value)}
                className="typo-form mt-3"
                placeholder="Add some text"
            />
        </Form>
    );
};

export default TextForm;
