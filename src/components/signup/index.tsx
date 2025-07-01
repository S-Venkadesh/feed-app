import React, { useState, useReducer } from "react";
import { CardComponent } from "../../widgets/card";
import { InputFieldComponent } from "../../widgets/inputfield";
import { ButtonComponent } from "../../widgets/Button";
import { LinkComponent } from "../../widgets/link";

import { useNavigate } from 'react-router-dom';

import "./styles.css";
import { isValidPassword, validateEmail } from "../../utils";

const SIGNUP_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
  REPEAT_PASSWORD: "repeatpassword",
};

const ERROR_MESSAGE = {
  EMAIL: "Enter valid email or user name",
  PASSWORD: "Password lengtth should greater than 6",
  REPEAT_PASSWORD: "Repeat password should same as password",
};

const defaultErrorState = {
  [SIGNUP_FIELDS.EMAIL]: {
    isError: false,
    errorMsg: "",
  },
  [SIGNUP_FIELDS.PASSWORD]: {
    isError: false,
    errorMsg: "",
  },
  [SIGNUP_FIELDS.REPEAT_PASSWORD]: {
    isError: false,
    errorMsg: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case SIGNUP_FIELDS.EMAIL:
      return {
        ...state,
        [SIGNUP_FIELDS.EMAIL]: {
          ...action.value,
        },
      };
    case SIGNUP_FIELDS.PASSWORD:
      return {
        ...state,
        [SIGNUP_FIELDS.PASSWORD]: {
          ...action.value,
        },
      };
    case SIGNUP_FIELDS.REPEAT_PASSWORD:
      return {
        ...state,
        [SIGNUP_FIELDS.REPEAT_PASSWORD]: {
          ...action.value,
        },
      };
    case "reset":
      return { ...defaultErrorState };
    default:
      return { ...defaultErrorState };
  }
}

export function SignUpComponent() {
    const navigate = useNavigate();

  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [alreadyHaveAcc, setAlreadyHaveAcc] = useState(false);

  const [errorMessages, dispatchError] = useReducer(reducer, {
    ...defaultErrorState,
  });

  function checkIsValidInput() {
    let isValid = true;

    if (emailOrUserName.trim() === "") {
      isValid = false;
      dispatchError({ type: SIGNUP_FIELDS.EMAIL ,value: { isError: true,
                 errorMsg: ERROR_MESSAGE.EMAIL
               }});
    }

    if (password.trim().split("").length < 6) {
      isValid = false;
      dispatchError({ type: SIGNUP_FIELDS.PASSWORD, 
              value: { isError: true,
                 errorMsg: ERROR_MESSAGE.PASSWORD
               } });
    }

    if (reenteredPassword === "" || password !== reenteredPassword) {
      isValid = false;
      dispatchError({ type: SIGNUP_FIELDS.REPEAT_PASSWORD, value: { isError: true,
                 errorMsg: ERROR_MESSAGE.REPEAT_PASSWORD
               } });
    }

    if (isValid) {
      dispatchError("reset");
    }

    return isValid;
  }

  function authenticateUser() {
    if (checkIsValidInput()) {
      let isAlreadyHaveAcc = localStorage.getItem(emailOrUserName);
      if(!isAlreadyHaveAcc){
      localStorage.setItem(
        emailOrUserName,
        JSON.stringify({
          userName: emailOrUserName,
          password: password,
        })
      );

      navigate('/'); 
      }else {
setAlreadyHaveAcc(true)
      }

    }
  }

  return (
    <CardComponent className="signUpCard" footerRenderer={<FooterRenderer />}>
      <div className="signUpheader">
        <span className="title">Create an account to continue</span>
        <span className="helpText">
          Create an account to access all the features on this app
        </span>
      </div>

      <InputFieldComponent
        onChange={(e) => {
          let value = e.target.value;
                     setEmailOrUserName(value);
          if (validateEmail(value)) {
 
            dispatchError({
              type: SIGNUP_FIELDS.EMAIL,
              value: {
                ...defaultErrorState[SIGNUP_FIELDS.EMAIL]
              },
            });
          } else {
            dispatchError({
              type: SIGNUP_FIELDS.EMAIL,
              value: { isError: true,
                 errorMsg: ERROR_MESSAGE.EMAIL
               },
            });
          }
        }}
        label="Email or username"
        value={emailOrUserName}
        showError={errorMessages[SIGNUP_FIELDS.EMAIL].isError}
        errorMessage={errorMessages[SIGNUP_FIELDS.EMAIL].errorMsg}
        placeholder="Enter email or username here"
      />
      <InputFieldComponent
        onChange={(e) => {
          let value = e.target.value;
                   setPassword(value);
          if (isValidPassword(value)) {
   
            dispatchError({
              type: SIGNUP_FIELDS.PASSWORD,
              value: {
                ...defaultErrorState[SIGNUP_FIELDS.PASSWORD]
              },
            });
          } else {
                   dispatchError({
              type: SIGNUP_FIELDS.PASSWORD,
              value: { isError: true,
                 errorMsg: ERROR_MESSAGE.PASSWORD
               },
            });
          }
        }}
        label="Password"
        value={password}
        showError={errorMessages[SIGNUP_FIELDS.PASSWORD].isError}
        errorMessage={errorMessages[SIGNUP_FIELDS.PASSWORD].errorMsg}
        placeholder="Enter password here"
      />
      <InputFieldComponent
        onChange={(e) => {
          let value = e.target.value;
               setReenteredPassword(value);
          if (value.trim() !== "" && password === value) {
       
             dispatchError({
              type: SIGNUP_FIELDS.REPEAT_PASSWORD,
              value: {
                ...defaultErrorState[SIGNUP_FIELDS.REPEAT_PASSWORD]
              },
            });
          } else {
                   dispatchError({
              type: SIGNUP_FIELDS.REPEAT_PASSWORD,
              value: { isError: true,
                 errorMsg: ERROR_MESSAGE.REPEAT_PASSWORD
               },
            });
          }
        }}
        label="Repeat password"
        value={reenteredPassword}
        showError={errorMessages[SIGNUP_FIELDS.REPEAT_PASSWORD].isError}
        errorMessage={errorMessages[SIGNUP_FIELDS.REPEAT_PASSWORD].errorMsg}
        placeholder="Repeat password here"
      />
      <ButtonComponent
        className="submitInSignUp"
        onClick={() => authenticateUser()}
        label={"Sign up"}
      />
      {alreadyHaveAcc ? <span className="errorText"> Alreasy this mail have account</span> : null}
    </CardComponent>
  );
}

function FooterRenderer() {
  return (
    <div className="signUpFooter">
      <span className="footerText"> Alreasy have an account ?</span>
      <LinkComponent
        className="signInLink"
        label={"Sign In"}
        onClick={() => {}}
      />
    </div>
  );
}
