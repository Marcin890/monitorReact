import styled from "styled-components";
import { Link } from "react-router-dom";
import {
    BsBrightnessHigh,
    BsMoon,
    BsList,
    BsBell,
    BsQuestionCircle,
    BsType,
    BsController,
} from "react-icons/bs";

export const IconMoon = styled(BsMoon)`
    color: ${({ theme }) => theme.colors.text.second};
`;

export const IconBrightnessHigh = styled(BsBrightnessHigh)`
    color: ${({ theme }) => theme.colors.text.second};
`;

export const IconList = styled(BsList)`
    color: ${({ theme }) => theme.colors.text.second};
`;

export const IconBell = styled(BsBell)`
    color: ${({ theme }) => theme.colors.text.second};
`;

export const IconQuestionCircle = styled(BsQuestionCircle)`
    color: ${({ theme }) => theme.colors.text.second};
`;
export const IconTypes = styled(BsType)`
    color: ${({ theme }) => theme.colors.text.second};
`;
export const IconController = styled(BsController)`
    color: ${({ theme }) => theme.colors.text.second};
`;

export const NavbarVertical = styled.nav`
    flex-direction: column;
    height: 90vh;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
`;

export const NavTop = styled.div``;
export const NavMiddle = styled.div`
    flex-grow: 1;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;
export const NavBottom = styled.div``;

export const NavLink = styled(Link)`
    margin-bottom: 32px;
`;
