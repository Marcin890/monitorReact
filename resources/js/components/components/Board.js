import React, { useState } from "react";

import Website from "./Website";
import { Info, Name, Wrapper, Icons } from "./Board.css";
import {
    IconRefresh,
    IconAdd,
    IconEdit,
    IconDelete,
    IconUser,
    IconRight,
    IconDown,
    Websites,
} from "./Board.css";
const Board = ({ data }) => {
    const [showWebsites, setShowWebsites] = useState(false);

    const websites = data.websites.map((website) => {
        return <Website data={website} />;
    });
    return (
        <>
            <Wrapper>
                <Info>
                    {showWebsites ? (
                        <IconDown
                            size={16}
                            onClick={() => setShowWebsites(!showWebsites)}
                        />
                    ) : (
                        <IconRight
                            size={16}
                            onClick={() => setShowWebsites(!showWebsites)}
                        />
                    )}

                    <Name>{data.name}</Name>
                    <Icons>
                        <IconRefresh size={16} />
                        <IconAdd size={16} />
                        <IconEdit size={16} />
                        <IconDelete size={16} />
                        <IconUser size={16} />
                    </Icons>
                </Info>
                {showWebsites && <Websites>{websites}</Websites>}
            </Wrapper>
        </>
    );
};

export default Board;
