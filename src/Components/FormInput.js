import React from "react";

const FormInput = ({ handleInputChange, ...otherProps }) => {
    return (
        <div className="form">
            <input
                className="form-input"
                onChange={handleInputChange}
                {...otherProps}
            ></input>
        </div>
    );
};

export default FormInput;
