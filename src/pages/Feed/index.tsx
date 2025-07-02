import React, { useState, useEffect, useContext, useRef } from "react";
import { CardComponent } from "../../widgets/card";

import "./styles.css";
import { RichTextComponent } from "../../widgets/richtext";
import { FeedBox } from "../../components/feedbox";
import { SignInComponent } from "../../components/signin";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MOCK_FEEDS = [
  {
    id: "001",
    name: "Theresa webb",
    time: "5 mins ago",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
  },
  {
    id: "002",
    name: "John deo",
    time: "5 mins ago",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
  },
];

export function FeedPage() {
  const naviagate = useNavigate();

  const { user } = useContext(AuthContext);

  const feedContainerRef = useRef<HTMLDivElement | null>(null);

  // console.log(authenticated, "authenticateds")

  const [feedsList, setFeedsList] = useState(MOCK_FEEDS);
  const [inputValue, setInputValue] = React.useState("");
  // const [loggedIn, setUserLoggedIn] = useState<boolean | null>(null);

  const loggedInRef = useRef<boolean | null>(null)


  const [showSignInPopup, setShowSignInPopup] = useState(false);

  function onUpdateFeed() {
    if (inputValue.trim() !== "") {
      setFeedsList((prevstate) => {
        return [
          ...prevstate,
          { message: inputValue, name: "fine", id: `${Math.random()}` },
        ];
      });
    }
    setInputValue("");
  }

  const handleClick = () => {
    if (!loggedInRef.current) {
      setShowSignInPopup(true);
    }
  };

  useEffect(() => {
    const node = feedContainerRef.current;
    if (!node) return;

    node.addEventListener("click", ()=>handleClick());

    return () => {
      node.removeEventListener("click", ()=>handleClick());
    };
  }, []);

  useEffect(
    function updateAuthenticationDetails() {
      if (user !== null && user.userName) {
        // setUserLoggedIn(true);
        loggedInRef.current = true;
        setShowSignInPopup(false)
      }
    },
    [user]
  );

  console.log(loggedInRef.current, "loggedIn")

  return (
    <>
      <div
        className={`feedWrapper `}
        ref={feedContainerRef}
      >
        <header className={`header ${
          !showSignInPopup ? "authenticated" : "notAuthenticated"
        }`}>
          <div className="user name">{user?.userName || ""}</div>
          <button
            onClick={() => {
              naviagate("/signin");
            }}
            className="loginText"
          >
            Login
          </button>
        </header>
        <section className="contentSection">
          <section className={`feedSection ${
          !showSignInPopup ? "authenticated" : "notAuthenticated"
        }`}>
            <RichTextComponent
              value={inputValue}
              onChange={(e) => {
                let value = e.target.value;
                setInputValue(value);
              }}
              onPublish={onUpdateFeed}
            />

            {feedsList.map((feed) => {
              return <FeedBox name={feed.name} message={feed.message} />;
            })}
          </section>
        </section>
      </div>
      {showSignInPopup ? <SignInModal /> : null}
    </>
  );
}

function SignInModal() {
  return (
    <div className="modalPopup">
      <SignInComponent />
    </div>
  );
}
