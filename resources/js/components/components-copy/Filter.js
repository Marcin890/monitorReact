import React from "react";
import { Button } from "react-bootstrap";
const Filter = ({ value, active, setFilter }) => {
    return (
        <Button
            onClick={() => setFilter(value)}
            variant={value === active ? "success" : "secondary"}
            type="button"
            className="mr-2"
        >
            {value.charAt(0).toUpperCase() + value.slice(1)}
        </Button>
    );
};

export default Filter;
