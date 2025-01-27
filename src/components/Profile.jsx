import {UseAuth} from "../hooks/AuthContext.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import JournalList from "./JournalList.jsx";

export default function Profile(props) {
    const {simpleUser} = UseAuth();
    const [user, setUser] = useState({avatar: "", displayName: "", username: ""});
    const [relationship, setRelationship] = useState({following: [], followers: []});
    const [me, setMe] = useState(true);
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        const decideUser = () => {
            if (!props.username || props.username === simpleUser.username) {
                setMe(true);
                setUsername(simpleUser.username);
            } else {
                setMe(false);
                setUsername(props.username);
            }
        };

        decideUser();
    }, [props.username, simpleUser.username]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:8080/api/user/${username}?details=true`);
                setUser(userResponse.data);
                const relationshipResponse = await axios.get(
                    `http://localhost:8080/api/relationship/${username}`
                );
                setRelationship(relationshipResponse.data);
                if (!me && (relationship.followers.includes(username) || relationship.friends.includes(username))) {
                    setFollowed(true);
                }
            } catch (err) {
                setError(err);
            }
        };

        if (username) {
            fetchUserData();
        }
    }, [username]);

    const handleFollow = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/relationship/followinng/${simpleUser.username}${username}`);
            if (response.status === 201) {
                setFollowed(true);
                setRelationship((prev) => ({
                    ...prev,
                    followers: [...prev.followers, simpleUser.username],
                }));
            }
        } catch (err) {
            setError(err);
        }
    }

    const handleUnfollow = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/relationship/following/${simpleUser.username}/${username}`);
            if (response.status === 200) {
                setFollowed(false);
                setRelationship((prev) => ({
                    ...prev,
                    followers: prev.followers.filter((follower) => follower !== simpleUser.username),
                }));
            }
        } catch (err) {
            setError(err);
        }
    }


    return (
        <div className = "bg-gray-100 min-h-screen p-6">
            {error && <p className = "text-red-500 mb-4">Error: {error.message}</p>}

            <div className = "max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className = "flex items-center space-x-4">
                    <img
                        src = {user.avatar || "src/assets/default-avatar.svg"}
                        alt = {user.username || "Unknown User"}
                        className = "w-20 h-20 rounded-full border border-gray-300"
                    />
                    <div>
                        <h1 className = "text-2xl font-semibold text-gray-800">
                            {user.displayName || "Display Name Not Available"}
                            {user.gender === "Male" ? <span className = "text-blue-500">♂</span> :
                                user.gender === "Female" ? <span className = "text-pink-500">♀</span> : null}
                        </h1>
                        <p className = "text-gray-600">@{user.username || "Username Not Available"}</p>
                        <p className = {"text-gray-600"}>站龄: {user.createdDays}天</p>
                    </div>

                    {!me && (
                        <button className = "ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Follow
                        </button>
                    )}
                </div>

                {/* Stats Section */}
                <div className = "mt-6 flex justify-between border-t border-gray-200 pt-4">
                    <div className = "text-center">
                        <p className = "text-xl font-bold text-gray-800">{relationship.following.length}</p>
                        <p className = "text-gray-600">Following</p>
                    </div>
                    <div className = "text-center">
                        <p className = "text-xl font-bold text-gray-800">{relationship.following.length}</p>
                        <p className = "text-gray-600">Followers</p>
                    </div>
                    <div className = "text-center">
                        <p className = "text-xl font-bold text-gray-800">{relationship.followers.length}</p>
                        <p className = "text-gray-600">Friends</p>
                    </div>
                </div>
            </div>
            {username && <JournalList url = {`http://localhost:8080/api/journal/${username}`}/>}
        </div>
    );
}
