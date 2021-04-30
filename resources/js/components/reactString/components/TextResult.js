import React, { useState } from "react";
import { changeText } from "../functions/changeText";
import { useClipboard } from "use-clipboard-hook";
import { Button } from "react-bootstrap";

const TextResult = ({ text, setShowAlert }) => {
    const { ref, copy, cut } = useClipboard({
        onSuccess: () => {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 1500);
        },
    });

    return (
        <>
            <div className="result" ref={ref}>
                {changeText(text)}
            </div>
            <Button className="mt-3" onClick={copy} variant="success">
                Copy
            </Button>
        </>
    );
};

export default TextResult;
