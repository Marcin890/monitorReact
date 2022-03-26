import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { changeText } from "./functions/changeText";

const Slider = () => {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [news, setNews] = useState("");

    return (
        <>
            <Container className="mt-5">
                <Row className="mb-5">
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
                            <h1 className="sli-title">{changeText(title)}</h1>
                            <span className="sli-text">{changeText(text)}</span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md>
                        <Form.Group>
                            <Form.Label>News</Form.Label>
                            <Form.Control
                                as="textarea"
                                onChange={(e) => setNews(e.target.value)}
                                style={{ height: "100px" }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <ul className="sli-list">
                            <li className="sli-news">
                                Przykładowy tytuł newsa
                            </li>
                            <li className="sli-news">{changeText(news)}</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Slider;
