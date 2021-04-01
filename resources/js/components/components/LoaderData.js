import React from "react";
import Loader from "react-loader-spinner";

const LoaderData = () => {
    return (
        <>
            <div className="loader-container">
                <Loader type="Oval" color="#00BFFF" height={80} width={80} />
            </div>
        </>
    );
};

export default LoaderData;
