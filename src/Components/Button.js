import React from "react";
import styled from "styled-components";
/*
 *
 * styling
 */
const StyledButton = styled.button`
    padding: 10px;
    font-size: 12px;
    color: black;
    outline: none;
    background-color: pink;
`;

const Button = ({ children }) => {
    return <StyledButton>{children}</StyledButton>;
};

export default Button;
