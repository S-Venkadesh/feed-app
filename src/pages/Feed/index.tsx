import React, {useState} from "react";
import { CardComponent } from "../../widgets/card";

import "./styles.css";
import { RichTextComponent } from "../../widgets/richtext";
import { FeedBox } from "../../components/feedbox";

const MOCK_FEEDS = [
    {
        id: "001",
        name: "Theresa webb",
        time: "5 mins ago",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s "
    },
        {
        id: "002",
        name: "John deo",
        time: "5 mins ago",
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s "
    }
]

export function FeedPage(){
    const [feedsList, setFeedsList] = useState(MOCK_FEEDS)
    return (
        <div className="feedWrapper">
            <header className="header">
                <div className="user name">foo-roo</div>
                <div className="loginText">Login</div>
            </header>
            <section className="contentSection">
                <section className="feedSection">
      
                   <RichTextComponent value={""} onPublish={()=> console.log()} />

                {feedsList.map((feed)=>{
                    return (
                        <FeedBox name={feed.name} message={feed.message} />
                    )
                })}
                </section>

            </section>
        </div>
    )
}