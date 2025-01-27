import {useState} from "react";
import axios from "axios";
import {UseAuth} from "../hooks/AuthContext.jsx";

export default function QuickDiary() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {simpleUser} = UseAuth();

    const handlePost = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/journal/new", {
                title: title,
                content: content,
                username: simpleUser.username
            });
            if (response.status === 201) {
                setTitle("");
                setContent("");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error posting journal:", error);
        }
    };

    return (
        <div className = "border-2 shadow p-4 items-center">
            <div className = "flex items-start space-x-4">
                <img
                    className = "w-8 h-8 rounded-full"
                    src = {simpleUser.avatar}
                    alt = {simpleUser.displayName}
                />
                <div className = "w-full">
                    {isExpanded ? (
                        <>
                            <input
                                type = "text"
                                className = "w-full p-2 border rounded-md mb-2 focus:outline-none"
                                placeholder = "Title (Optional)"
                                onChange = {(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                className = "w-full h-20 p-2 border rounded-md focus:outline-none"
                                placeholder = "Content"
                                onChange = {(e) => setContent(e.target.value)}
                            />
                        </>
                    ) : (
                        <textarea
                            className = "w-full h-20 p-2 border rounded-md"
                            placeholder = "What's on your mind?"
                            onFocus = {() => setIsExpanded(true)}
                        />
                    )}
                </div>
            </div>
            <div className = "flex justify-end mt-2">
                <button
                    className = "px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400"
                    onClick = {handlePost}
                >
                    Post
                </button>
            </div>
        </div>
    );
}
