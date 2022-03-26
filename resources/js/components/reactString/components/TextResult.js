import React, { useState } from "react";
import { changeText } from "../functions/changeText";
import { useClipboard } from "use-clipboard-hook";
import { Button } from "react-bootstrap";

const TextResult = ({ text, setShowAlert, id }) => {
    const { ref, copy, cut } = useClipboard({
        onSuccess: () => {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 1500);
        },
    });

    return (
        <>
            <Button onClick={copy} variant="success">
                Copy
            </Button>
            <div className="typo-form mt-3" ref={ref}>
                {changeText(text, id)}
            </div>
        </>
    );
};

export default TextResult;
