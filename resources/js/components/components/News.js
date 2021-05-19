import React, { useState, useEffect } from "react";
import axios from "axios";
import WebsiteNews from "./WebsiteNews";
import { Button, Modal } from "react-bootstrap";
import Filter from "./Filter";
import LoaderData from "./LoaderData";
import Iframe from "react-iframe";
import { config } from "../../constants/constants";
const News = ({ match }) => {
    const boardId = match.params.id;

    const url2 = config.url.API_URL;

    const url = `${url2}/admin/showBoardNews/${boardId}`;
    const [data, setData] = useState();
    let [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [filter, setFilter] = useState("unread");
    const [preview, setPreview] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = async (url) => {
        setIsError(false);
        setLoading(true);
        try {
            const result = await axios(url);
            setData(result.data);
        } catch (error) {
            setIsError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData(`${url2}/admin/showBoardNews/${boardId}`);
    }, []);

    const refreshBoardNews = async () => {
        setIsError(false);
        setLoading(true);
        try {
            const result = await axios(
                `${url2}/admin/refreshBoardNews/${boardId}`
            );
            setData(result.data.original);
        } catch (error) {
            setIsError(true);
        }
        setLoading(false);
    };

    const readNews = (id, website_id) => {
        axios.get(`/admin/readNews/${id}`).then((response) => {
            const { websites, ...restData } = data;

            const updatedWebsites = websites.map((website) => {
                if (website.id === website_id) {
                    website.unread--;
                }
                const { news, ...restOfWebsites } = website;
                const updatedNewses = news.map((neww) => {
                    if (neww.id === response.data.news.id) {
                        return (neww.status = "read");
                    } else {
                        return neww;
                    }
                });
                return { ...restOfWebsites, news: updatedNewses };
            });

            const updatedData = {
                ...restData,
                websites: updatedWebsites,
            };

            setData(updatedData);
        });
    };

    const readAllNews = (id) => {
        axios.get(`/admin/readAllNews/${id}`).then((response) => {
            const { websites, ...restData } = data;
            const updatedWebsites = websites.map((website) => {
                if (website.id === id) {
                    website.unread = 0;
                    website.news = response.data;
                    return website;
                } else {
                    return website;
                }
            });
            const updatedData = {
                ...restData,
                websites: updatedWebsites,
            };

            setData(updatedData);
        });
    };

    const showWebsitesNews = () => {
        const websitesNews = data.websites.map((website) => (
            <WebsiteNews
                key={website.id}
                website={website}
                filter={filter}
                readNews={readNews}
                readAllNews={readAllNews}
            />
        ));

        return websitesNews;
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                animation={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Iframe
                        url={preview}
                        id="myId"
                        className="iframeSize"
                        display="initial"
                        position="relative"
                    />
                </Modal.Body>
            </Modal>
            {isError && "aa"}
            <h2 className="mt-5">News</h2>
            <Button onClick={refreshBoardNews}>Refresh</Button>
            <div className="filters mt-5 mb-5">
                <Filter value="unread" active={filter} setFilter={setFilter} />
                <Filter value="read" active={filter} setFilter={setFilter} />
                <Filter value="all" active={filter} setFilter={setFilter} />
            </div>

            {loading && <LoaderData />}

            {data && <>{showWebsitesNews()}</>}
        </>
    );
};

export default News;
