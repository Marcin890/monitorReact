import React, { useState } from "react";
import ReactDOM from "react-dom";
// import Navigation from "./components/Navigation";
// import Boards from "./components/Boards";
// import Page from "./components/Page";
import { BrowserRouter as Router } from "react-router-dom";
import { AppWrapper } from "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { ThemeProvider } from "styled-components";
import themeLight from "./utils/themeLight";
import themeDark from "./utils/themeDark";
import GlobalStyles from "./index.css";
import { AppContext } from "../context/AppContext";
// Components
import MainNavigation from "./components/MainNavigation";
import Page from "./components/Page";

// imr, sfc
function App() {
    const [colorTheme, setColorTheme] = useState(false);
    const [secondMenu, setSecondMenu] = useState(true);
    console.log(`secondMenu: ${secondMenu}`);

    return (
        <>
            <ThemeProvider theme={!colorTheme ? themeDark : themeLight}>
                <GlobalStyles />
                <Router>
                    <AppContext.Provider value={(secondMenu, setSecondMenu)}>
                        <AppWrapper>
                            <Container fluid>
                                <Row>
                                    <Col xs={1}>
                                        <MainNavigation
                                            colorTheme={colorTheme}
                                            setColorTheme={() =>
                                                setColorTheme(!colorTheme)
                                            }
                                            setSecondMenu={() =>
                                                setSecondMenu(!secondMenu)
                                            }
                                        ></MainNavigation>
                                    </Col>
                                    <Col xs={11}>
                                        <Page secondMenu={secondMenu} />
                                    </Col>
                                </Row>
                            </Container>
                        </AppWrapper>
                    </AppContext.Provider>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
