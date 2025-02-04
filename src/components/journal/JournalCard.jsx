import Avatar from "../user/Avatar.jsx";
import {useState} from "react";

//TODO
export default function JournalCard() {

    const [like, setLike] = useState(false);
    const [comment, setComment] = useState(false);

    const likeJournal = () => {
        setLike(!like);
    };
    const commentJournal = () => {
        setComment(!comment);
    }
    return (
        <div className = {"card card-compact bg-amber-100 w-11/12 shadow-xl"}>
            <div className = {"card-body"}>
                <div className = {"flex flex-row"}>
                    <Avatar/>
                    <div className = "ml-2 flex flex-col">
                        <p>username</p>
                        <p>display name</p>
                    </div>
                    <div className = {"pt-6 ml-2"}>
                        <p>date</p>
                    </div>
                </div>
                <h2 className = "card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <div className = "card-actions justify-end mr-3 pb-2">
                <button onClick = {likeJournal} className = "btn btn-square btn-sm">
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
                <button onClick = {commentJournal} className = "btn btn-square btn-sm">
                    {comment ? (// Solid
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
            </div>
            {comment ?
                <div className = {"card-body card-bordered"}>
                    <div className = {"flex flex-col border-2"}>
                        <li>comment</li>
                        <li>comment</li>
                        <li>comment</li>
                        <li>comment</li>
                        <li>comment</li>
                    </div>
                    <div className = {"form-control"}>
                        <label htmlFor = "comment">Comment</label>
                        <textarea id = "comment" rows = "2" placeholder = {"Say something!"}/>
                        <button className = {"btn btn-primary w-24 "}>Submit</button>
                    </div>
                </div>
                : null}
        </div>
    )
}
