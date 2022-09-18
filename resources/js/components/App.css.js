import styled from "styled-components";

export const AppWrapper = styled.div`
    background: ${({ theme }) => theme.colors.background.main};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 64px;
`;
