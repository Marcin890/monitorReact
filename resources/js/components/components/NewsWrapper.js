import React, { useContext, useState } from "react";
import News from "./News";
import Boards from "./Boards";

// import { Container, Row, Col } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import { Container, BoardsContainer, NewsContainer } from "./NewsWrapper.css";

const NewsWrapper = ({ secondMenu }) => {
    // const secondMenu = useContext(AppContext);

    return (
        <>
            <Container>
                {secondMenu && (
                    <BoardsContainer>
                        <Boards />
                    </BoardsContainer>
                )}

                <NewsContainer>
                    <News />
                </NewsContainer>
            </Container>
        </>
    );
};

export default NewsWrapper;
