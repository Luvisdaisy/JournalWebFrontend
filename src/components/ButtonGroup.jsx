import {useState} from "react";
import JournalList from "./JournalList.jsx";
import Messages from "./Messages.jsx";
import {UseAuth} from "../hooks/AuthContext.jsx";

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
        <div>
            <div className = "flex justify-center mt-4">
                <button
                    className = {`px-4 py-2 rounded-bl-xl rounded-tl-xl w-1/3 ${pageName === "myJournals" ? "bg-blue-400 text-white" : "bg-gray-200"}`}
                    onClick = {() => handleButtonClick("myJournals", "http://localhost:8080/api/journal/all")}
                >
                    World
                </button>
                <button
                    className = {`px-4 py-2 w-1/3 ${pageName === "friends" ? "bg-blue-400 text-white" : "bg-gray-200"}`}
                    onClick = {() => handleButtonClick("friends", `http://localhost:8080/api/journal/friends/${simpleUser.username}`)}
                >
                    Friends
                </button>
                <button
                    className = {`px-4 py-2 rounded-br-xl rounded-tr-xl w-1/3 ${pageName === "messages" ? "bg-blue-400 text-white" : "bg-gray-200"}`}
                    onClick = {() => handleButtonClick("messages")}
                >
                    Messages
                </button>
            </div>
            {pageName === "messages" ? <Messages/> : <JournalList url = {url}/>}
        </div>
    );
}