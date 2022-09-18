import styled from "styled-components";
import {
    BsArrowClockwise,
    BsPlusLg,
    BsPencil,
    BsTrash,
    BsPerson,
    BsChevronRight,
    BsChevronDown,
} from "react-icons/bs";

export const Info = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const Wrapper = styled.div`
    margin-bottom: 16px;
    width: 100%;
    /* &:hover ~ ${Icons} {
        display: flex;
    } */
`;
export const Icons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-grow: 2;
    display: flex;
`;
export const Name = styled.div`
    color: ${({ theme }) => theme.colors.text.main};
    font-weight: bold;
    font-size: 12px;
`;

export const Websites = styled.div``;

export const IconRefresh = styled(BsArrowClockwise)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-left: 6px;
`;
export const IconAdd = styled(BsPlusLg)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-left: 6px;
`;
export const IconEdit = styled(BsPencil)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-left: 6px;
`;
export const IconDelete = styled(BsTrash)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-left: 6px;
`;
export const IconUser = styled(BsPerson)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-left: 6px;
`;
export const IconRight = styled(BsChevronRight)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-right: 6px;
`;
export const IconDown = styled(BsChevronDown)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-right: 6px;
`;
