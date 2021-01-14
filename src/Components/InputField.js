import React from "react";

const InputField = ({ ...otherProps }) => {
    return (
        <React.Fragment>
            <input className="form-input" {...otherProps}></input>
        </React.Fragment>
    );
};

export default InputField;
