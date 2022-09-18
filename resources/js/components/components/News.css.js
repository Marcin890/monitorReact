import styled from "styled-components";
import { BsArrowClockwise, BsCheck2 } from "react-icons/bs";

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
`;
export const Icons = styled.div`
    display: flex;
`;
export const Wrapper = styled.div`
    margin-left: 32px;
`;

export const Button = styled.button`
    color: ${({ theme }) => theme.colors.text.main};
    border: 1px solid ${({ theme }) => theme.colors.text.second};
`;

export const IconRefresh = styled(BsArrowClockwise)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-left: 6px;
`;
export const IconCheck = styled(BsCheck2)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-left: 6px;
`;

export const NewsTable = styled.table`
    vertical-align: top;
    width: 100%;
`;
