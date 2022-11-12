import React from "react";

import { Container, CloseButton, FormContainer } from "./Modal.css";

const Modal = ({ data, setFormData }) => {
    // console.log(data);

    const action = data.action;

    return (
        <>
            <Container>
                <CloseButton onClick={() => setFormData(null)} size={24} />
                <FormContainer>
                    {action == "addBoard" && <AddBoard />}
                    {action == "editBoard" && <EditBoard data={data} />}
                </FormContainer>
            </Container>
        </>
    );
};

export default Modal;
