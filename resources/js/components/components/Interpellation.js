import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { config } from "../../constants/constants";
import axios from "axios";
import LoaderData from "./LoaderData";

const url = config.url.API_URL;

const Interpellation = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(5);
    const [recipient, setRecipient] = useState("minister zdrowia");
    const [type, setType] = useState(1);
    const [progressPercent, setProgressPercent] = useState();

    const refreshInterpellations = () => {
        setIsLoading(true);
        setProgressPercent(1);
        let round = 0;

        for (let i = min; i < max; i++) {
            axios
                .post(`${url}/admin/refreshInterpellations`, {
                    recipient: recipient,
                    type: type,
                    page: i,
                })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => console.log(error));
        }

        setIsLoading(false);
    };
    console.log(min);
    console.log(max);
    return (
        <>
            <h2 className="mt-5">Interpellations</h2>
            {isLoading && <LoaderData />}
            <div className="row no-gutters mt-5">
                <div className="col-sm-5">
                    <Form.Control
                        as="select"
                        onChange={(e) => setRecipient(e.target.value)}
                    >
                        <option value="minister zdrowia">
                            minister zdrowia
                        </option>
                        <option value="prezes Rady Ministrów">
                            prezes Rady Ministrów
                        </option>
                        <option value="minister edukacji i nauki">
                            minister edukacji i nauki
                        </option>
                        <option value="minister finansów">
                            minister finansów
                        </option>
                        <option value="minister spraw zagranicznych">
                            minister spraw zagranicznych
                        </option>
                        <option value="minister sprawiedliwości">
                            minister sprawiedliwości
                        </option>
                        <option value="minister spraw wewnętrznych i administracji">
                            minister spraw wewnętrznych i administracji
                        </option>
                    </Form.Control>
                </div>
                <div className="col-sm-3">
                    <Form.Control
                        as="select"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="1">Interpelacje</option>
                        <option value="2">Zapytania</option>
                        <option value="3">Pytania</option>
                    </Form.Control>
                </div>
                <div className="col-sm-1">
                    <Form.Control
                        type="number"
                        onChange={(e) => setMin(Number(e.target.value))}
                        value={min}
                    />
                </div>
                <div className="col-sm-1">
                    <Form.Control
                        type="number"
                        onChange={(e) => setMax(Number(e.target.value))}
                        value={max}
                    />
                </div>
                <div className="col-sm-2">
                    <Button onClick={refreshInterpellations}>Get </Button>
                </div>
            </div>
        </>
    );
};

export default Interpellation;
