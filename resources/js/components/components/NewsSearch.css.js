import styled from "styled-components";

export const Search = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 32px;
`;
export const Input = styled.input`
    background-color: ${({ theme }) => theme.colors.background.second};
    border: 1px solid ${({ theme }) => theme.colors.text.second};
    flex-grow: 2;

    color: ${({ theme }) => theme.colors.text.main};
`;
