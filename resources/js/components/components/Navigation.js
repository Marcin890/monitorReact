import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";

const list = [
    { name: "start", path: "/", exact: true },
    { name: "contact", path: "/contact" },
];

const Navigation = () => {
    return (
        <>
            <Navbar
                expand="lg"
                bg=""
                variant="light"
                sticky="top"
                className="nav-sidebar"
            >
                <Nav className="mt-5 ">
                    <Nav.Item>
                        <Link to={`/admin`}>
                            <Button variant="white" size="sm">
                                Boards <BsChevronRight />
                            </Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={`/search`}>
                            <Button variant="white" size="sm">
                                Search <BsChevronRight />
                            </Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={`/typography`}>
                            <Button variant="white" size="sm">
                                Typography <BsChevronRight />
                            </Button>
                        </Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </>
    );
};

export default Navigation;
