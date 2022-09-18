import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
        color: ${({ theme }) => theme.colors.text.main};
    }
`;
