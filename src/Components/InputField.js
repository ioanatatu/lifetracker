import React from "react";
import styled from "styled-components";

const InputField = ({ ...otherProps }) => {
    return (
        <React.Fragment>
            <input className="form-input" {...otherProps}></input>
        </React.Fragment>
    );
};

export default InputField;
