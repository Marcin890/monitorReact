import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const list = [
    { name: "start", path: "/", exact: true },
    { name: "contact", path: "/contact" }
];

const Navigation = () => {
    return (
        <>
            <Nav className="flex-column mt-5">
                <Nav.Item>
                    <Link to={`/admin`}>Boards</Link>
                </Nav.Item>
            </Nav>
        </>
    );
};

export default Navigation;
