import React from "react";

import { Container, CloseButton, FormContainer } from "./Modal.css";
import AddBoard from "./AddBoard";

const Modal = ({ data, setFormData }) => {
    console.log(data);

    const action = data.action;

    return (
        <>
            <Container>
                <CloseButton onClick={() => setFormData(null)} size={24} />
                <FormContainer>
                    {action == "addBoard" && <AddBoard />}
                </FormContainer>
            </Container>
        </>
    );
};

export default Modal;
