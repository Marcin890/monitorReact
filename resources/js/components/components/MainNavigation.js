import React from "react";

import {
    IconMoon,
    IconBrightnessHigh,
    IconList,
    IconBell,
    IconQuestionCircle,
    IconTypes,
    IconController,
    NavbarVertical,
    NavLink,
    NavTop,
    NavMiddle,
    NavBottom,
} from "./MainNavigation.css";
const MainNavigation = ({ setColorTheme, colorTheme, setSecondMenu }) => {
    return (
        <>
            <NavbarVertical>
                <NavTop>
                    <IconList size={25} onClick={() => setSecondMenu()} />
                </NavTop>
                <NavMiddle>
                    <NavLink to={`/admin`}>
                        <IconBell size={25} />
                    </NavLink>
                    <NavLink to={`/interpellation`}>
                        <IconQuestionCircle size={25} />
                    </NavLink>
                    <NavLink to={`/typography`}>
                        <IconTypes size={25} />
                    </NavLink>
                    <NavLink to={`/games`}>
                        <IconController size={25} />
                    </NavLink>
                </NavMiddle>
                <NavBottom>
                    <NavLink onClick={() => setColorTheme()}>
                        {colorTheme ? (
                            <IconMoon size={25} />
                        ) : (
                            <IconBrightnessHigh size={25} />
                        )}
                    </NavLink>
                </NavBottom>
            </NavbarVertical>
        </>
    );
};

export default MainNavigation;
