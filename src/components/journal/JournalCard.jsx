import Avatar from "../user/Avatar.jsx";
import {useState} from "react";
import {UseAuth} from "../../hooks/AuthContext.jsx";
import axios from "axios";
import {TimeCalculator} from "../../utils/TimeCalculator.js";
import Comment from "./Comment.jsx";

export default function JournalCard({journal}) {
    const {simpleUser} = UseAuth();

    const [likes, setLikes] = useState(journal.likes || []);
    const [like, setLike] = useState(() => {
        return likes.includes(simpleUser.username)
    });

    const [commentClicked, setCommentClicked] = useState(false);
    const [comments, setComments] = useState(journal.comments || []);
    const [commentData, setCommentData] = useState({
        "content": "", "simpleUser": {
            "username": simpleUser.username,
            "displayName": simpleUser.displayName, "avatar": simpleUser.avatar
        }
    });

    const [date, setDate] = useState(TimeCalculator(journal.updatedDatetime));

    const [error, setError] = useState("");

    const [isDeleted, setIsDeleted] = useState(journal.isDeleted);

    const maxContentLength = 100;

    const handleCommentToggle = (e) => {
        e.preventDefault()
        setCommentClicked((prev) => !prev);
    }

    const handleCommentChange = (e) => {
        setCommentData((prev) => ({...prev, content: e.target.value}));
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault()

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
            setError("Server Error: " + error);
        } finally {
            setCommentData((prev) => ({...prev, content: ""}));
        }
    };

    const handleLikeClick = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8080/api/journal/like?id=${journal.id}&username=${simpleUser.username}`);
            if (response.status === 202) {
                setLikes((...prev) => [...prev, simpleUser.username]);
                setLike(true);
            } else {
                setError("Error liking post");
            }
        } catch (error) {
            setError("Server Error: " + error);
        }
    }
    const handleUnlikeClick = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8080/api/journal/unlike?id=${journal.id}&username=${simpleUser.username}`);
            if (response.status === 202) {
                setLikes((prev) => [...prev.filter((like) => like !== simpleUser.username)]);
                setLike(false);
            } else {
                setError("Error unliking post");
            }
        } catch (error) {
            setError("Server Error: " + error);
        }
    }

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:8080/api/journal/${journal.id}`);

            if (response.status === 202) {
                setIsDeleted((prev) => !prev);
            } else {
                setError("Error deleting post");
            }
        } catch (error) {
            setError("Server Error: " + (error.response?.data?.message || error.message));
        }
    };

    if (isDeleted) return null;

    return (
        <div className = {"card card-compact bg-amber-100 w-11/12 shadow-xl mb-2"}>
            <div className = {"card-body"}>
                <dialog id = "confirm_delete_modal" className = "modal">
                    <div className = "modal-box">
                        <h3 className = "font-bold text-lg">Confirmation</h3>
                        <p className = "py-4">Are you sure to delete this journal?</p>
                        <div className = "modal-action">
                            <form method = "dialog" className = {"flex flex-row gap-2"}>
                                <button className = "btn btn-neutral">Cancel</button>
                                <button onClick = {handleDeleteClick} className = {"btn btn-error"}>Delete</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <div className = {"flex flex-row"}>
                    <Avatar username = {journal.author.username} avatar = {journal.author.avatar}/>
                    <div className = "ml-2 flex flex-col">
                        <p className = {"font-black"}>{journal.author.displayName}</p>
                        <p className = {"font-mono"}>@{journal.author.username}</p>
                    </div>
                </div>
                <h2 className = "card-title">{journal.title}</h2>
                <p>{journal.content}</p>
                <p>{date}</p>
            </div>
            <div className = "card-actions justify-end mr-3 pb-2">
                <button onClick = {like ? handleUnlikeClick : handleLikeClick}
                        className = "btn btn-square btn-sm">
                    {like ? (// Solid
                        <svg xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 24 24" fill = "currentColor"
                             className = "size-6">
                            <path
                                d = "m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                        </svg>
                    ) : (// Outline
                        <svg xmlns = "http://www.w3.org/2000/svg" fill = "none" viewBox = "0 0 24 24"
                             strokeWidth = {1.5} stroke = "currentColor" className = "size-6">
                            <path strokeLinecap = "round" strokeLinejoin = "round"
                                  d = "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                        </svg>
                    )}
                </button>
                <button onClick = {handleCommentToggle} className = "btn btn-square btn-sm">
                    {commentClicked ? (// Solid
                        <svg xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 24 24" fill = "currentColor"
                             className = "size-6">
                            <path fillRule = "evenodd"
                                  d = "M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                                  clipRule = "evenodd"/>
                        </svg>
                    ) : (// Outline
                        <svg xmlns = "http://www.w3.org/2000/svg" fill = "none" viewBox = "0 0 24 24"
                             strokeWidth = {1.5}
                             stroke = "currentColor" className = "size-6">
                            <path strokeLinecap = "round" strokeLinejoin = "round"
                                  d = "M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                        </svg>
                    )}
                </button>
                {journal.author.username === simpleUser.username ?
                    <button onClick = {() => document.getElementById('confirm_delete_modal').showModal()}
                            className = "btn btn-square btn-sm">
                        <svg xmlns = "http://www.w3.org/2000/svg" fill = "none" viewBox = "0 0 24 24"
                             strokeWidth = {1.5} stroke = "currentColor" className = "size-6">
                            <path strokeLinecap = "round" strokeLinejoin = "round"
                                  d = "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                        </svg>
                    </button> :
                    null
                }
            </div>
            {commentClicked ?
                <div className = {"card-body"}>
                    <div className = {"flex flex-col"}>
                        {comments.map((comment) => (<Comment key = {comment.id} comment = {comment}/>))}
                    </div>
                    <div className = {"form-control flex flex-row gap-2"}>
                        <textarea className = {"textarea textarea-bordered textarea-ghost textarea-xs w-full bg-white"}
                                  id = "comment" placeholder = {"Say something!"} onChange = {handleCommentChange}
                                  value = {commentData.content}/>
                        <button onClick = {handleCommentSubmit}
                                className = {"btn btn-primary btn-md "}>Submit
                        </button>
                    </div>
                </div>
                : null}
            {error ? <div className = {"alert alert-error"}>{error}</div> : null}
        </div>
    )
}
