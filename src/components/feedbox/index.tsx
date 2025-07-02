import React, { ReactElement, ReactNode } from "react";

import "./styles.css";
import { CardComponent } from "../../widgets/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface feedboaxProps {
  message: string;
    name: string;
}

export function FeedBox({
  name,
  message,
}: feedboaxProps) {
  return (
     <CardComponent className="feedBoxCard" footerRenderer={<div></div>}>
        <Header name={name} />

        <span className="message">{message}</span>
                            
    </CardComponent>
  );
}

interface headerProp {
  name: string;
}

function Header({name}: headerProp){
    return (
        <header className="feebBoxheader">
            <div className="profile">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="profileSection">
                <span className="feedPostpersonName">{name}</span>
                <span className="time">5 mins ago</span>
            </div>
        </header>
    )
}
