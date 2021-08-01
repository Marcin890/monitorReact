import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

const Slider = () => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    return (
        <>
            <Container className="mt-5">
                <Row>
                    <Col md>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                as="textarea"
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ height: "100px" }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                onChange={(e) => setText(e.target.value)}
                                style={{ height: "200px" }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <div className="sli">
                            <h1 className="sli-title">{title}</h1>
                            <span className="sli-text">{text}</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Slider;
