import React from "react";
import { ChangeEvent } from "react"; // Явный импорт типа ChangeEvent
import "./index.css";

interface InputProps {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isValid: boolean;
  errorMessage: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  isValid,
  errorMessage,
}) => (
  <div className="field">
    <label>{placeholder}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ borderColor: isValid ? "" : "#F23152" }}
    />
    <div className="field__error" style={{ color: "#F23152" }}>
      {isValid ? "" : errorMessage}
    </div>
  </div>
);

export default Input;
