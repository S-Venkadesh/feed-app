import React from "react";

import "./styles.css"

interface inputFieldProps {
    value: string,
    label: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputFieldComponent({value, label, onChange, placeholder="Enter text here..."}: inputFieldProps){
    return (
        <div className="labelWrapper">
            <label className="label">{label}</label>
            <input className="inputbox" placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}