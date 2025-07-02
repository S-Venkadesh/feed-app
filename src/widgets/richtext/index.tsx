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

interface richtextProps {
  value: string;
  onPublish: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function RichTextComponent({
  value = "",
  onPublish = () => {},
}: richtextProps) {
  return (
    <CardComponent className="feedRichText" footerRenderer={<div></div>}>
    <div className="richtextWrapper">
      <RichtextHeader />

      <section className="richTextInputSection">
        <FontAwesomeIcon className="smileIcon" icon={faFaceSmile} />
        <textarea
          className="richtextInputField"
          value={value}
          placeholder="Enter text here...."
        />
      </section>

      <FooterSection />
    </div>
    </CardComponent>
  );
}

function FooterSection() {
  return (
    <footer className="richtextFooter">
      <section className="sendOptions">
        <div className="plusIconWrapper">
          <FontAwesomeIcon icon={faPlus} />
        </div>

        <FontAwesomeIcon icon={faVideo} />
        <FontAwesomeIcon icon={faMicrophoneSlash} />
      </section>

      <FontAwesomeIcon icon={faPaperPlane} className="sendIcon" />
    </footer>
  );
}

function RichtextHeader() {
  return (
    <header className="richTextHeader">
      <section className="richtextActions">
        <div className="actionSection para">
          <span>Paragraph</span>
          <FontAwesomeIcon className="icon" icon={faAngleDown} />
        </div>
        <div className="actionSection bold">
          <FontAwesomeIcon className="fontIcon" icon={faBold} />
        </div>
        <div className="actionSection Italic">
          <FontAwesomeIcon className="fontIcon" icon={faItalic} />
        </div>

        <div className="actionSection underline">
          <FontAwesomeIcon className="fontIcon" icon={faUnderline} />
        </div>

        <div className="divider" />

        <div className="actionSection Italic">
          <FontAwesomeIcon className="fontIcon" icon={faItalic} />
        </div>

        <div className="actionSection underline">
          <FontAwesomeIcon className="fontIcon" icon={faUnderline} />
        </div>
      </section>

      <div className="deleteIcon">
        <FontAwesomeIcon className="fontIcon" color="red" icon={faTrash} />
      </div>
    </header>
  );
}
