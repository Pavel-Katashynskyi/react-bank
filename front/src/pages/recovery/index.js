import React, { useState } from "react";
import Input from "../../component/input";

import BackendSimulation from "../../utils/BackEnd";
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import Button from "../../component/button";
import "./index.css";

import { useNavigate } from "react-router-dom";

import danger_logo from "./danger.svg";
import { useAuth } from "../../utils/AuthContext";

const RecoveryPage = () => {
  const [email, setEmail] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const backend = BackendSimulation();
  const navigate = useNavigate();
  const { updateUserData, updateConfirmationCode } = useAuth();

  const validateEmail = (value) => {
    // Перевірка емейла
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleRecovery = async () => {
    // Перевірка емейла
    const isEmailValid = validateEmail(email);
    setIsValidEmail(isEmailValid);

    if (!isEmailValid) {
      setErrorMessage("Помилка введених даних");
      return;
    }

    // Перевірка наявності користувача в базі

    const recoveryResult = async () => {
      const res = await fetch(`http://localhost:3000/recovery/?email=${email}`);
      const data = await res.json();

      if (res.ok) {
        setErrorMessage("");

        const confirmationCode = backend.sendCode();
        const userData = { email };
        updateUserData(userData);
        updateConfirmationCode(confirmationCode);
        console.log(email, userData);
        navigate("/recovery-confirm");
      } else {
        setErrorMessage(data.message);
        setIsValidEmail(false);
        console.log(errorMessage);
      }
    };

    recoveryResult();
  };

  return (
    <Page>
      <BackButton />
      <div className="title">
        <h2>Recover password</h2>
        <h3>Choose a recovery method</h3>
      </div>

      <div className="form">
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Емейл"
          isValid={isValidEmail}
          errorMessage="Введіть коректний емейл"
        />
        <Button onClick={handleRecovery}>Send code</Button>
        {errorMessage && (
          <div className="error">
            <span>
              <img src={danger_logo} alt="icon" />
            </span>
            {errorMessage}
          </div>
        )}
      </div>
    </Page>
  );
};

export default RecoveryPage;
