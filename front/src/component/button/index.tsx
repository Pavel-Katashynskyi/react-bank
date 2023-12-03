import "./index.css";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, type, onClick }) => {
  return (
    <div onClick={onClick} className={`button ${type || ""}`}>
      {children}
    </div>
  );
};

export default Button;
