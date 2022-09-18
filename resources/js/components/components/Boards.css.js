import styled from "styled-components";
import { BsPlusLg } from "react-icons/bs";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const IconPlus = styled(BsPlusLg)`
    color: ${({ theme }) => theme.colors.text.second};
`;

export const Info = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
`;
export const InfoItem = styled.p`
    font-weight: bold;
    font-size: 12px;
`;
export const List = styled.ul``;
