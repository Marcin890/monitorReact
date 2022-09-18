import styled from "styled-components";

import { BsPencil, BsTrash } from "react-icons/bs";

export const Info = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
`;
export const Name = styled.div`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.second};
    font-weight: bold;
`;
export const Icons = styled.div`
    display: flex;
`;

export const IconEdit = styled(BsPencil)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-left: 6px;
`;
export const IconDelete = styled(BsTrash)`
    color: ${({ theme }) => theme.colors.text.second};
    margin-left: 6px;
`;
