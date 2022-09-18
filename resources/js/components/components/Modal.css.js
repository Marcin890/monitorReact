import styled from "styled-components";
import { BsXLg } from "react-icons/bs";

export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 30%;
    background: ${({ theme }) => theme.colors.background.second};
    z-index: 999;
    color: ${({ theme }) => theme.colors.text.second};
    padding: 32px;
`;
export const CloseButton = styled(BsXLg)``;

export const FormContainer = styled.div`
    margin-top: 32px;
`;
