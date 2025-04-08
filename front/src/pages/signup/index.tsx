import React, { useState, ChangeEvent } from "react";
import Input from "../../component/input";
import BackendSimulation from "../../utils/BackEnd";
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import Button from "../../component/button";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

import danger_logo from "./danger.svg";
import PasswordInput from "../../component/input-password";
import { useAuth } from "../../utils/AuthContext";

interface User {
  email: string;
  password: string;
  confirm: boolean;
  transactions: any[];
  balance: number;
  notifications: any[];
}

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirmation, setIsValidPasswordConfirmation] =
    useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const backend = BackendSimulation();
  const navigate = useNavigate();
  const { updateUserData, updateConfirmationCode } = useAuth();

  const validatePassword = (value: string): boolean => {
    // Перевірка пароля
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(value);
  };

  const validateEmail = (value: string): boolean => {
    // Перевірка емейла
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSignup = async (): Promise<void> => {
    // Перевірка пароля
    const isPasswordValid = validatePassword(password);
    setIsValidPassword(isPasswordValid);

    // Перевірка емейла
    const isEmailValid = validateEmail(email);
    setIsValidEmail(isEmailValid);

    // Перевірка підтвердження пароля
    const isPasswordConfirmationValid = password === passwordConfirmation;
    setIsValidPasswordConfirmation(isPasswordConfirmationValid);

    if (!isPasswordValid || !isEmailValid || !isPasswordConfirmationValid) {
      setErrorMessage("Помилка введених даних");
      return;
    }

    // Перевірка наявності користувача в базі

    const signupResult = async (): Promise<void> => {
      const res = await fetch(
        `http://localhost:3000/signup/?email=${email}&password=${password}`
      );
      const data = await res.json();

      console.log(res, res.status);

      if (res.ok) {
        setErrorMessage("");
        const confirmationCode = backend.sendCode();

        // Перехід на сторінку підтвердження

        const userData: User = {
          email,
          password,
          confirm: false,
          transactions: [],
          balance: 0,
          notifications: [],
        };
        updateUserData(userData);
        updateConfirmationCode(confirmationCode.toString());
        console.log(email, password, userData, confirmationCode);

        navigate("/signup-confirm");
      } else {
        setErrorMessage(data.message);
        setIsValidEmail(false);
        console.log(errorMessage);
      }
    };

    signupResult();
  };

  return (
    <Page>
      <BackButton />
      <div className="title">
        <h2>Sign up</h2>
        <h3>Choose a registration method</h3>
      </div>

      <div className="form">
        <Input
          type="text"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder="Емейл"
          isValid={isValidEmail}
          errorMessage="Введіть коректний емейл"
        />
        <PasswordInput
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Пароль"
          isValid={isValidPassword}
          errorMessage="Пароль має містити мінімум 8 символів, літери, цифри та технічні символи"
        />
        <PasswordInput
          type="password"
          value={passwordConfirmation}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPasswordConfirmation(e.target.value)
          }
          placeholder="Підтвердіть пароль"
          isValid={isValidPasswordConfirmation}
          errorMessage="Паролі не співпадають"
        />
        <div>
          Already have an account? &nbsp;
          <Link className="linkstyle" to="/signin">
            Sign In
          </Link>
        </div>
        <Button onClick={handleSignup}>Continue</Button>
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

export default SignupPage;
