import React from "react";

import "./styles.css"

interface inputFieldProps {
    value: string,
    label: string,
    placeholder: string,
    showError: boolean,
    errorMessage: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputFieldComponent({value, label, onChange, placeholder="Enter text here...", showError, errorMessage}: inputFieldProps){
    return (
        <div className="labelWrapper">
            <label className="label">{label}</label>
            <input className="inputbox" placeholder={placeholder} value={value} onChange={onChange} />
            {showError ? <span className="errorText">{errorMessage}</span>: null}
        </div>
    )
}