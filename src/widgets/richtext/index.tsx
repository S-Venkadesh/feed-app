import React from "react";

import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBold,
  faFaceSmile,
  faItalic,
  faMicrophoneSlash,
  faPaperPlane,
  faPlus,
  faTrash,
  faUnderline,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { CardComponent } from "../card";
import Tooltip from "../Tooltip";

interface richtextProps {
  value: string;
  onPublish: () => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function RichTextComponent({
  value = "",
  onPublish,
  onChange,
}: richtextProps) {


  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onPublish()
      console.log('Enter pressed');
    }
  };

  return (
    <CardComponent className="feedRichText" footerRenderer={<div></div>}>
      <div className="richtextWrapper">
        <RichtextHeader />

        <section className="richTextInputSection">
          <FontAwesomeIcon className="smileIcon" icon={faFaceSmile} />
          <textarea
            className="richtextInputField"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter text here...."
          />
        </section>

        <FooterSection onPublish={onPublish} />
      </div>
    </CardComponent>
  );
}

interface richtextFooter {
  onPublish: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function FooterSection({ onPublish }: richtextFooter) {
  return (
    <footer className="richtextFooter">
      <section className="sendOptions">
        <Tooltip>
          <div className="plusIconWrapper">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </Tooltip>

        <Tooltip>
          <FontAwesomeIcon icon={faVideo} />
        </Tooltip>

        <Tooltip>
          <FontAwesomeIcon icon={faMicrophoneSlash} />
        </Tooltip>
      </section>

      <button onClick={onPublish} className="sendButton">
        <FontAwesomeIcon icon={faPaperPlane} className="sendIcon" />
      </button>
    </footer>
  );
}

function RichtextHeader() {
  return (
    <header className="richTextHeader">
      <section className="richtextActions">
        <Tooltip>
          <div className="actionSection para">
            <span>Paragraph</span>
            <FontAwesomeIcon className="icon" icon={faAngleDown} />
          </div>
        </Tooltip>

        <Tooltip>
          <div className="actionSection bold">
            <FontAwesomeIcon className="fontIcon" icon={faBold} />
          </div>
        </Tooltip>

        <Tooltip>
          <div className="actionSection Italic">
            <FontAwesomeIcon className="fontIcon" icon={faItalic} />
          </div>
        </Tooltip>

        <Tooltip>
          {" "}
          <div className="actionSection underline">
            <FontAwesomeIcon className="fontIcon" icon={faUnderline} />
          </div>
        </Tooltip>

        <div className="divider" />

        <Tooltip>
          <div className="actionSection Italic">
            <FontAwesomeIcon className="fontIcon" icon={faItalic} />
          </div>
        </Tooltip>

        <Tooltip>
          <div className="actionSection underline">
            <FontAwesomeIcon className="fontIcon" icon={faUnderline} />
          </div>
        </Tooltip>
      </section>

      <Tooltip>
        <div className="deleteIcon">
          <FontAwesomeIcon className="fontIcon" color="red" icon={faTrash} />
        </div>
      </Tooltip>
    </header>
  );
}
