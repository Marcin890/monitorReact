import styled from "styled-components";

export const Title = styled.input`
    background-color: ${({ theme }) => theme.colors.background.second};
    border: 1px solid ${({ theme }) => theme.colors.text.second};
    width: 100%;
    margin-top: 16px;
    color: ${({ theme }) => theme.colors.text.main};
`;
