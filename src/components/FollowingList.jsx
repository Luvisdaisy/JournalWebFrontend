import {UseAuth} from "../hooks/AuthContext.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

export default function FollowingList() {
    const {userData} = UseAuth();
    const username = userData.username;
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/relationship/following/" + username)
            .then((response) => {
                setFollowing(response.data);
            });
    }, [username]);

    return (
        <div className = "max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className = "flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className = "font-bold text-lg text-gray-800">Following</div>
                <a
                    href = "#view-all"
                    className = "text-blue-500 hover:underline"
                >
                    View all
                </a>
            </div>

            <div className = "p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {following.slice(0, 5).map((user) => (
                    <div
                        key = {user.username}
                        className = "flex flex-col items-center space-y-3 bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-all"
                    >
                        <img
                            src = {user.avatar ? user.avatar : "src/assets/user.svg"}
                            alt = {user.displayName}
                            className = "w-16 h-16 rounded-full border-2 border-gray-300"
                        />
                        <div className = "text-gray-800 font-semibold text-center text-sm">
                            {user.displayName}
                        </div>
                        <button
                            className = "px-4 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                            Follow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
