import React, { useState, useReducer } from "react";
import { CardComponent } from "../../widgets/card";
import { InputFieldComponent } from "../../widgets/inputfield";
import { ButtonComponent } from "../../widgets/Button";
import { LinkComponent } from "../../widgets/link";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { isValidPassword, validateEmail } from "../../utils";
import { useAuth } from "../../context/AuthContext";

type FieldKey = "email" | "password";

type FieldState = {
  isError: boolean;
  errorMsg: string;
};

type SignInState = {
  email: FieldState;
  password: FieldState;
};

type Action =
  | { type: FieldKey; value: FieldState }
  | { type: "reset" };

const SIGNIN_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
} as const;

const ERROR_MESSAGE = {
  EMAIL: "Enter valid email or user name",
  PASSWORD: "Password length should be greater than 6",
};

const defaultErrorState: SignInState = {
  email: { isError: false, errorMsg: "" },
  password: { isError: false, errorMsg: "" },
};

function reducer(state: SignInState, action: Action): SignInState {
  switch (action.type) {
    case "email":
    case "password":
      return {
        ...state,
        [action.type]: action.value,
      };
    case "reset":
      return defaultErrorState;
    default:
      return state;
  }
}

export function SignInComponent() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");
  const [haveAccount, setHaveAccount] = useState(true);

  const [errorMessages, dispatchError] = useReducer(reducer, defaultErrorState);

  function checkIsValidInput() {
    let isValid = true;

    if (emailOrUserName.trim() === "") {
      isValid = false;
      dispatchError({
        type: "email",
        value: { isError: true, errorMsg: ERROR_MESSAGE.EMAIL },
      });
    }

    if (password.trim().length < 6) {
      isValid = false;
      dispatchError({
        type: "password",
        value: { isError: true, errorMsg: ERROR_MESSAGE.PASSWORD },
      });
    }

    if (isValid) {
      dispatchError({ type: "reset" });
    }

    return isValid;
  }

  function authenticateUser() {
    if (checkIsValidInput()) {
      const success = login({ userName: emailOrUserName, password });
      if (success) {
        navigate("/");
      } else {
        setHaveAccount(false);
      }
    }
  }

  return (
    <CardComponent className="signInCard" footerRenderer={<FooterRenderer />}>
      <div className="signInheader">
        <span className="title">Sign in to continue</span>
        <span className="helpText">
          Sign in to access all the features of this app
        </span>
      </div>

      <InputFieldComponent
        onChange={(e) => {
          const value = e.target.value;
          setEmailOrUserName(value);
          dispatchError({
            type: "email",
            value: validateEmail(value)
              ? defaultErrorState.email
              : { isError: true, errorMsg: ERROR_MESSAGE.EMAIL },
          });
        }}
        label="Email or username"
        value={emailOrUserName}
        showError={errorMessages.email.isError}
        errorMessage={errorMessages.email.errorMsg}
        placeholder="Enter email or username here"
      />

      <InputFieldComponent
        onChange={(e) => {
          const value = e.target.value;
          setPassword(value);
          dispatchError({
            type: "password",
            value: isValidPassword(value)
              ? defaultErrorState.password
              : { isError: true, errorMsg: ERROR_MESSAGE.PASSWORD },
          });
        }}
        label="Password"
        value={password}
        showError={errorMessages.password.isError}
        errorMessage={errorMessages.password.errorMsg}
        placeholder="Enter password here"
      />

      <ButtonComponent
        className="submitInSignIn"
        onClick={authenticateUser}
        label="Sign in"
      />

      {!haveAccount && (
        <span className="errorText">Invalid credentials. Please try again.</span>
      )}
    </CardComponent>
  );
}

function FooterRenderer() {
  const navigate = useNavigate();
  return (
    <div className="signInFooter">
      <span className="footerText">Don't have an account?</span>
      <LinkComponent
        className="signUpLink"
        label="Sign up"
        onClick={() => navigate("/signup")}
      />
    </div>
  );
}
