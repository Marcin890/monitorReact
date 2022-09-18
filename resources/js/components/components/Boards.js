import { React, useState } from "react";
import { Wrapper, Header, IconPlus, Info, InfoItem, List } from "./Boards.css";
import Board from "./Board";
import Modal from "./Modal";
const Boards = () => {
    const data = [
        {
            id: 25,
            name: "Urzędy Marszałk.",
            created_at: "2021-05-21T18:25:32.000000Z",
            updated_at: "2022-07-10T08:53:03.000000Z",
            unreaded_news: 15,
            websites_number: 1,
            pivot: {
                user_id: 1,
                board_id: 25,
            },
            websites: [
                {
                    name: "NIL",
                    url: "https://nil.org.pl/aktualnosci",
                    selector: "h2",
                    board_id: 22,
                    priority: 2,
                },
                {
                    name: "Bielska",
                    url: "https://pulsmedycyny.pl/najnowsze/",
                    selector: "h2",
                    board_id: 22,
                    priority: 2,
                },
            ],
        },
        {
            id: 26,
            name: "Medycyna",
            created_at: "2021-05-21T18:25:46.000000Z",
            updated_at: "2022-07-10T08:53:04.000000Z",
            unreaded_news: 16,
            websites_number: 2,
            pivot: {
                user_id: 1,
                board_id: 26,
            },
            websites: [
                {
                    name: "NIL",
                    url: "https://nil.org.pl/aktualnosci",
                    selector: "h2",
                    board_id: 22,
                    priority: 2,
                },
                {
                    name: "Bielska",
                    url: "https://pulsmedycyny.pl/najnowsze/",
                    selector: "h2",
                    board_id: 22,
                    priority: 2,
                },
            ],
        },
        {
            id: 28,
            name: "NIL",
            created_at: "2021-05-22T10:51:10.000000Z",
            updated_at: "2022-07-10T08:53:06.000000Z",
            unreaded_news: 7,
            websites_number: 1,
            pivot: {
                user_id: 1,
                board_id: 28,
            },
            websites: [
                {
                    name: "NIL",
                    url: "https://nil.org.pl/aktualnosci",
                    selector: "h2",
                    board_id: 22,
                    priority: 2,
                },
                {
                    name: "Bielska",
                    url: "https://pulsmedycyny.pl/najnowsze/",
                    selector: "h2",
                    board_id: 22,
                    priority: 2,
                },
            ],
        },
        {
            id: 29,
            name: "Puls",
            created_at: "2021-07-03T18:44:10.000000Z",
            updated_at: "2022-07-10T08:53:07.000000Z",
            unreaded_news: 15,
            websites_number: 1,
            pivot: {
                user_id: 1,
                board_id: 29,
            },
            websites: [
                {
                    name: "NIL",
                    url: "https://nil.org.pl/aktualnosci",
                    selector: "h2",
                    board_id: 22,
                    priority: 2,
                },
                {
                    name: "Bielska",
                    url: "https://pulsmedycyny.pl/najnowsze/",
                    selector: "h2",
                    board_id: 22,
                    priority: 2,
                },
            ],
        },
    ];

    const boards = data.map((board) => {
        return <Board data={board} />;
    });

    const websitesNumber = () => {
        let number = 0;
        data.forEach((board) => {
            number += board.websites_number;
        });

        return number;
    };

    const [formData, setFormData] = useState(null);
    console.log(formData);

    return (
        <>
            <Wrapper>
                <Header>
                    <h1>Boards</h1>
                    <IconPlus
                        size={25}
                        onClick={() =>
                            setFormData({ action: "addBoard", data: null })
                        }
                    />
                </Header>
                <Info>
                    <InfoItem>Boards: {data.length}</InfoItem>
                    <InfoItem>Websites: {websitesNumber()}</InfoItem>
                </Info>
                {boards}

                {formData && (
                    <Modal data={formData} setFormData={setFormData} />
                )}
            </Wrapper>
        </>
    );
};

export default Boards;
