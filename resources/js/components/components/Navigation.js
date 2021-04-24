import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const list = [
    { name: "start", path: "/", exact: true },
    { name: "contact", path: "/contact" }
];

const Navigation = () => {
    return (
        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                bg=""
                variant="light"
                sticky="top"
                className="nav-sidebar"
            >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="flex-column mt-5 ">
                        <Nav.Item>
                            <Link to={`/admin`}>Boards</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={`/typography`}>Typography</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Navigation;
