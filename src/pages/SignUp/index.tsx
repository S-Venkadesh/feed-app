import React from "react";

import "./styles.css";
import { CardComponent } from "../../widgets/card";
import { InputFieldComponent } from "../../widgets/inputfield";
import { ButtonComponent } from "../../widgets/Button";
import { LinkComponent } from "../../widgets/link";

export function SignUpPage() {
  return (
    <div className="signUpPageWrapper">
      <CardComponent className="signUpCard" footerRenderer={<FooterRenderer/>}>
        <div className="signUpheader">
          <span className="title">Create an account to continue</span>
          <span className="helpText">
            Create an account to access all the features on this app
          </span>
        </div>

        <InputFieldComponent
          onChange={(e) => console.log(e)}
          label="Email or username"
          value=""
          placeholder="Enter email or username here"
        />
        <InputFieldComponent
          onChange={(e) => console.log(e)}
          label="Password"
          value=""
          placeholder="Enter password here"
        />
        <InputFieldComponent
          onChange={(e) => console.log(e)}
          label="Re-enter password"
          value=""
          placeholder="Re-enter password here"
        />
        <ButtonComponent className="submitInSignUp" onClick={(e)=>console.log(e)} label={"Sign up"} />
      </CardComponent>
    </div>
  );
}

function FooterRenderer(){
    return( <div className="signUpFooter">
        <span className="footerText"> Alreasy have an account ?</span>
        <LinkComponent className="signInLink" label={"Sign In"} onClick={()=>{}} />
    </div>)
}
