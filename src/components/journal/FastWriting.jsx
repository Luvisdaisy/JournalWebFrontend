import {useState} from "react";
import {UseAuth} from "../../hooks/AuthContext.jsx";
import axios from "axios";

export default function FastWriting() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const {simpleUser} = UseAuth();

    const handlePost = async (e) => {
        e.preventDefault()
        if (content === "") {
            setError("Content cannot be empty");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/journal/new", {
                title: title,
                content: content,
                author: simpleUser
            });
            if (response.status === 201) {
                setTitle("");
                setContent("");
                window.location.reload();
            }
        } catch (error) {
            setError("Server Error: " + error);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    return (
        <div className = "items-start space-x-4 w-full mb-2 p-4 bg-white rounded-lg shadow-md">
            <div className = "w-full">
                <input
                    type = "text"
                    placeholder = "Title (Optional)"
                    className = "input input-bordered w-full mb-2 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value = {title}
                    onChange = {handleTitleChange}
                />

                <textarea
                    placeholder = "Write something..."
                    className = "textarea textarea-bordered w-full h-24 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    value = {content}
                    onChange = {handleContentChange}
                />

                <div className = "flex flex-row justify-end mt-3 gap-2">
                    {error &&
                        <div role = "alert" className = "alert alert-error h-12">
                            <span>{error}</span>
                        </div>
                    }
                    <button
                        className = "btn btn-primary"
                        onClick = {handlePost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>

    )
}