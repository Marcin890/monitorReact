import styled from "styled-components";
import { BsBookmark, BsForward, BsCheck2 } from "react-icons/bs";

export const InformationWrapper = styled.tr`
    font-size: 14px;
`;
export const Date = styled.td`
    color: ${({ theme }) => theme.colors.text.second};
`;

export const Content = styled.td`
    color: ${({ theme }) => theme.colors.text.primary};
`;
export const Board = styled.td`
    color: ${({ theme }) => theme.colors.text.second};
`;
export const Website = styled.td`
    color: ${({ theme }) => theme.colors.text.second};
`;
export const Bookmark = styled(BsBookmark)`
    color: ${({ theme }) => theme.colors.text.second};
`;
export const Link = styled(BsForward)`
    color: ${({ theme }) => theme.colors.text.second};
`;
export const Read = styled(BsCheck2)`
    color: ${({ theme }) => theme.colors.text.second};
`;
