import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";
import {
    BsChevronRight,
    BsType,
    BsSearch,
    BsReverseLayoutTextSidebarReverse,
    BsBell,
    BsSquareHalf,
    BsQuestionCircle,
} from "react-icons/bs";

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
                                <BsBell />
                                &nbsp; News
                            </Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={`/interpellation`}>
                            <Button variant="white" size="sm">
                                <BsQuestionCircle />
                                &nbsp; Interp.
                            </Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={`/boards`}>
                            <Button variant="white" size="sm">
                                <BsReverseLayoutTextSidebarReverse />
                                &nbsp; Boards
                            </Button>
                        </Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Link to={`/search`}>
                            <Button variant="white" size="sm">
                                <BsSearch />
                                &nbsp; Search
                            </Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={`/typography`}>
                            <Button variant="white" size="sm">
                                <BsType />
                                &nbsp; Typo
                            </Button>
                        </Link>
                        <Link to={`/slider`}>
                            <Button variant="white" size="sm">
                                <BsSquareHalf />
                                &nbsp; Slider
                            </Button>
                        </Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </>
    );
};

export default Navigation;
