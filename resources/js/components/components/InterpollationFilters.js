import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
const InterpollationFilters = ({ setFilter, filter }) => {
    return (
        <>
            <div className="row no-gutters mt-5">
                <div className="col-sm-4">
                    <Form.Control
                        defaultValue={filter.status}
                        as="select"
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                status: e.target.value,
                            })
                        }
                    >
                        <option value="all">Read/Unread</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </Form.Control>
                </div>
                <div className="col-sm-4">
                    <Form.Control
                        defaultValue={filter.type}
                        as="select"
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                type: e.target.value,
                            })
                        }
                    >
                        <option value="all">Int/Zap/Pyt</option>
                        <option value="1">Interpelacje</option>
                        <option value="2">Zapytania</option>
                        <option value="3">Pytania</option>
                    </Form.Control>
                </div>
                <div className="col-sm-4">
                    <Form.Control
                        defaultValue={filter.recipient}
                        as="select"
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                recipient: e.target.value,
                            })
                        }
                    >
                        <option value="all">All</option>
                        <option value="minister zdrowia">
                            minister zdrowia
                        </option>
                        <option value="prezes Rady Ministr??w">
                            prezes Rady Ministr??w
                        </option>
                        <option value="minister edukacji i nauki">
                            minister edukacji i nauki
                        </option>
                        <option value="minister finans??w">
                            minister finans??w
                        </option>
                        <option value="minister spraw zagranicznych">
                            minister spraw zagranicznych
                        </option>
                        <option value="minister sprawiedliwo??ci">
                            minister sprawiedliwo??ci
                        </option>
                        <option value="minister spraw wewn??trznych i administracji">
                            minister spraw wewn??trznych i administracji
                        </option>
                    </Form.Control>
                </div>
            </div>
        </>
    );
};

export default InterpollationFilters;
