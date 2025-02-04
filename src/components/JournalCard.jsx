import TimeCalculator from "../utils/time_calculator.js";
import {useState} from "react";
import axios from "axios";
import Comments from "./Comments.jsx";
import {UseAuth} from "../hooks/AuthContext.jsx";

export default function JournalCard({journal}) {
    const {simpleUser} = UseAuth();

    const [commentClicked, setCommentClicked] = useState(false);
    const [commentData, setCommentData] = useState({
        "content": "", "simpleUser": simpleUser
    });
    const [comments, setComments] = useState(journal.comments || []);

    const [likes, setLikes] = useState(journal.likes || []);
    const [likeStatus, setLikeStatus] = useState(() => {
        return likes.includes(simpleUser.username)
    });

    const [error, setError] = useState(null);

    const maxContentLength = 100;

    const handleCommentToggle = () => {
        setCommentClicked((prev) => !prev);
    };
    const handleCommentChange = (e) => {
        setCommentData((prev) => ({...prev, content: e.target.value}));
    };

    const handleCommentSubmit = async () => {
        setCommentData((prev) => ({...prev, content: ""}));
        try {
            if (commentData.content === "") {
                setError("Comment cannot be empty");
                return;
            }
            const response = await axios.put(`http://localhost:8080/api/journal/comment/${journal.id}`, commentData);
            if (response.status === 202) {
                const newComment = response.data;
                setComments((prev) => [...prev, newComment]);
            } else {
                setError("Error posting comment");
            }
        } catch (error) {
            setError("Server Error");
        } finally {
            setCommentData((prev) => ({...prev, content: ""}));
        }
    };

    const handleLikeClick = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/journal/like?id=${journal.id}&username=${simpleUser.username}`);
            if (response.status === 202) {
                setLikes((...prev) => [...prev, simpleUser.username]);
                setLikeStatus(true);
            } else {
                setError("Error liking post");
            }
        } catch (error) {
            setError("Server Error");
        }
    }

    const handleUnlikeClick = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/journal/unlike?id=${journal.id}&username=${simpleUser.username}`);
            if (response.status === 202) {
                setLikes((prev) => [...prev.filter((like) => like !== simpleUser.username)]);
                setLikeStatus(false);
            } else {
                setError("Error unliking post");
            }
        } catch (error) {
            setError("Server Error");
        }
    }

    return (
        <div
            className = "relative w-full max-w-3xl shadow-lg rounded-lg overflow-hidden bg-white mb-6"
        >
            <div className = "p-6">
                <h2 className = "text-2xl font-semibold text-gray-800">
                    {journal.title}
                </h2>
                <p className = "text-sm text-gray-500 mt-2">
                    {journal.createdDatetime.split("T")[0]} by <span
                    className = "font-medium">{journal.username}</span>
                </p>
                <p className = "mt-4 text-gray-700 leading-relaxed">{journal.content && journal.content.length > maxContentLength ? journal.content.slice(0, maxContentLength) + "......" : journal.content}
                </p>
                {TimeCalculator(journal.updatedDatetime) === null ? null : (<p className = "text-sm text-gray-500 mt-2">
                    {TimeCalculator(journal.updatedDatetime)}
                </p>)}
            </div>

            <div className = " relative bottom-2 left-6 flex space-x-10">
                {likeStatus ?
                    <button
                        className = "flex items-center justify-center p-1 text-xs bg-gray-200 hover:bg-white rounded-2xl shadow"
                        onClick = {() => handleUnlikeClick()}
                    >
                        <svg xmlns = "http://www.w3.org/2000/svg"
                             className = {"w-4 h-4"}
                             viewBox = "0 0 24 24"
                             id = "like"
                        >
                            <path
                                d = "M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path>
                        </svg>
                    </button>
                    :
                    <button
                        className = "flex items-center justify-center p-1 text-xs text-white hover:bg-gray-200 rounded-2xl shadow"
                        onClick = {() => handleLikeClick()}
                    >
                        <svg xmlns = "http://www.w3.org/2000/svg"
                             className = {"w-4 h-4"}
                             viewBox = "0 0 24 24"
                             id = "like"
                        >
                            <path
                                d = "M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path>
                        </svg>
                    </button>
                }
                <button
                    className = "flex items-center justify-center p-1 text-xs text-white hover:bg-gray-200 rounded-2xl shadow"
                    onClick = {handleCommentToggle}
                >
                    <svg
                        xmlns = "http://www.w3.org/2000/svg"
                        className = {"w-4 h-4"}
                        viewBox = "0 0 24 24"
                        id = "comment"
                    >
                        <path
                            d = "M18,2H6A3,3,0,0,0,3,5V16a3,3,0,0,0,3,3H8.59l2.7,2.71A1,1,0,0,0,12,22a1,1,0,0,0,.65-.24L15.87,19H18a3,3,0,0,0,3-3V5A3,3,0,0,0,18,2Zm1,14a1,1,0,0,1-1,1H15.5a1,1,0,0,0-.65.24l-2.8,2.4L9.71,17.29A1,1,0,0,0,9,17H6a1,1,0,0,1-1-1V5A1,1,0,0,1,6,4H18a1,1,0,0,1,1,1Z"></path>
                    </svg>
                </button>
            </div>
            {commentClicked && (
                <div>
                    {comments && <Comments comments = {comments}/>}
                    <div className = "p-4 border-t border-gray-300">
                    <textarea
                        className = "w-full h-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder = "Say something..."
                        value = {commentData.content}
                        onChange = {handleCommentChange}
                    />
                        <div className = "flex justify-end mt-2">
                            <button
                                className = "px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                                onClick = {handleCommentSubmit}
                            >
                                Submit
                            </button>
                        </div>
                        {error && <p className = "text-red-500">{error}</p>}
                    </div>
                </div>)}
        </div>);
}
