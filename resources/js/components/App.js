import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./components/Navigation";
import Boards from "./components/Boards";
import Page from "./components/Page";
import { BrowserRouter as Router } from "react-router-dom";

// imr, sfc
function App() {
    return (
        <>
            <Router>
                <div className="app">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2">
                                <Navigation />
                            </div>

                            <div className="col-lg-10 ">
                                <Page />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
