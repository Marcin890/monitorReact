// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { changeText } from "./functions/changeText";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import TextForm from "./components/TextForm";
import TextResult from "./components/TextResult";
import { v4 as uuid } from "uuid";

const Typography = () => {
    const [text, setText] = useState("");
    const [id, setId] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const updateText = (text, id) => {
        console.log(text);
        setText(text);
        setId(id);
    };

    return (
        <Container>
            {showAlert && (
                <Alert
                    variant="success"
                    onClose={() => setAlert({})}
                    dismissible
                >
                    The text has been copied
                </Alert>
            )}
            <Row>
                <h2 className="mt-5">Typography</h2>
            </Row>

            <Row className="mt-5">
                <Col md>
                    <TextForm updateText={updateText} />
                </Col>

                <Col md>
                    <TextResult
                        text={text}
                        id={id}
                        setShowAlert={setShowAlert}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Typography;
