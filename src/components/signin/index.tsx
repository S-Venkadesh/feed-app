import React, { useState, useReducer, useContext } from "react";
import { CardComponent } from "../../widgets/card";
import { InputFieldComponent } from "../../widgets/inputfield";
import { ButtonComponent } from "../../widgets/Button";
import { LinkComponent } from "../../widgets/link";

import { useNavigate } from "react-router-dom";

import "./styles.css";
import { isValidPassword, validateEmail } from "../../utils";
import {  useAuth } from "../../context/AuthContext";

const SIGNIN_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
};

const ERROR_MESSAGE = {
  EMAIL: "Enter valid email or user name",
  PASSWORD: "Password lengtth should greater than 6",
};

const defaultErrorState = {
  [SIGNIN_FIELDS.EMAIL]: {
    isError: false,
    errorMsg: "",
  },
  [SIGNIN_FIELDS.PASSWORD]: {
    isError: false,
    errorMsg: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case SIGNIN_FIELDS.EMAIL:
      return {
        ...state,
        [SIGNIN_FIELDS.EMAIL]: {
          ...action.value,
        },
      };
    case SIGNIN_FIELDS.PASSWORD:
      return {
        ...state,
        [SIGNIN_FIELDS.PASSWORD]: {
          ...action.value,
        },
      };
    case "reset":
      return { ...defaultErrorState };
    default:
      return { ...defaultErrorState };
  }
}

export function SignInComponent() {
  const navigate = useNavigate();

     const {login} = useAuth();

  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");
  const [haveAccount, setHaveAccount] = useState(true);

  const [errorMessages, dispatchError] = useReducer(reducer, {
    ...defaultErrorState,
  });

  function checkIsValidInput() {
    let isValid = true;

    if (emailOrUserName.trim() === "") {
      isValid = false;
      dispatchError({
        type: SIGNIN_FIELDS.EMAIL,
        value: { isError: true, errorMsg: ERROR_MESSAGE.EMAIL },
      });
    }

    if (password.trim().split("").length < 6) {
      isValid = false;
      dispatchError({
        type: SIGNIN_FIELDS.PASSWORD,
        value: { isError: true, errorMsg: ERROR_MESSAGE.PASSWORD },
      });
    }

    if (isValid) {
      dispatchError("reset");
    }

    return isValid;
  }

  function checkUserHaveAcc(user){
    console.log(user, "user",emailOrUserName, user.userName === emailOrUserName)
    if(user.userName ===emailOrUserName && user.password === password){
      return true
    }else {
      return false
    }
  }

  function authenticateUser() {
    if (checkIsValidInput()) {

      let userLogedInSuccessfully = login({userName: emailOrUserName, password: password})
      if(userLogedInSuccessfully){
        navigate("/");
      }else {
        setHaveAccount(false)
      }
    }
  }

  return (
    <CardComponent className="signInCard" footerRenderer={<FooterRenderer />}>
      <div className="signInheader">
        <span className="title">Sign in to continue</span>
        <span className="helpText">
          Sign in to access all the feature of this app
        </span>
      </div>

      <InputFieldComponent
        onChange={(e) => {
          let value = e.target.value;
          setEmailOrUserName(value);
          if (validateEmail(value)) {
            dispatchError({
              type: SIGNIN_FIELDS.EMAIL,
              value: {
                ...defaultErrorState[SIGNIN_FIELDS.EMAIL],
              },
            });
          } else {
            dispatchError({
              type: SIGNIN_FIELDS.EMAIL,
              value: { isError: true, errorMsg: ERROR_MESSAGE.EMAIL },
            });
          }
        }}
        label="Email or username"
        value={emailOrUserName}
        showError={errorMessages[SIGNIN_FIELDS.EMAIL].isError}
        errorMessage={errorMessages[SIGNIN_FIELDS.EMAIL].errorMsg}
        placeholder="Enter email or username here"
      />
      <InputFieldComponent
        onChange={(e) => {
          let value = e.target.value;
          setPassword(value);
          if (isValidPassword(value)) {
            dispatchError({
              type: SIGNIN_FIELDS.PASSWORD,
              value: {
                ...defaultErrorState[SIGNIN_FIELDS.PASSWORD],
              },
            });
          } else {
            dispatchError({
              type: SIGNIN_FIELDS.PASSWORD,
              value: { isError: true, errorMsg: ERROR_MESSAGE.PASSWORD },
            });
          }
        }}
        label="Password"
        value={password}
        showError={errorMessages[SIGNIN_FIELDS.PASSWORD].isError}
        errorMessage={errorMessages[SIGNIN_FIELDS.PASSWORD].errorMsg}
        placeholder="Enter password here"
      />
      <ButtonComponent
        className="submitInSignIn"
        onClick={() => authenticateUser()}
        label={"Sign in"}
      />
      {!haveAccount ? (
        <span className="errorText"> Something wrong put correct details</span>
      ) : null}
    </CardComponent>
  );
}

function FooterRenderer() {
  const navigate = useNavigate();
  return (
    <div className="signInFooter">
      <span className="footerText"> Do not have account ?</span>
      <LinkComponent
        className="signUpLink"
        label={"Sign up"}
        onClick={() => navigate("/signup")}
      />
    </div>
  );
}
