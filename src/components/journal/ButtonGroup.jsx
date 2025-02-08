import {useState} from "react";
import JournalList from "./JournalList.jsx";
import Messages from "../Messages.jsx";
import {UseAuth} from "../../hooks/AuthContext.jsx";

export default function ButtonGroup() {
    const {simpleUser} = UseAuth();
    const [pageName, setPageName] = useState(
        () => {
            return localStorage.getItem("pageName") || "myJournals"
        }
    );
    const [url, setUrl] = useState("http://localhost:8080/api/journal/all");

    const handleButtonClick = (newPageName, newUrl) => {
        localStorage.setItem("pageName", newPageName);
        setPageName(newPageName);
        if (newUrl) setUrl(newUrl);
    };

    return (
        <section>
            <div className = {"join"}>
                <input className = {"join-item btn w-full"} type = {"radio"} name = {"options"} aria-label = {"World"}
                       onClick = {() => handleButtonClick("myJournals", "http://localhost:8080/api/journal/all")}
                       defaultChecked/>
                <input className = {"join-item btn w-full"} type = {"radio"} name = {"options"} aria-label = {"Friends"}
                       onClick = {() => handleButtonClick("friends", `http://localhost:8080/api/journal/friends/${simpleUser.username}`)}/>
                <input className = {"join-item btn w-full"} type = {"radio"} name = {"options"}
                       aria-label = {"Messages"}
                       onClick = {() => handleButtonClick("messages")}/>
            </div>
            {pageName === "messages" ? <Messages/> : <JournalList url = {url}/>}
        </section>
    );
}