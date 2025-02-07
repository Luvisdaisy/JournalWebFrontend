import {UseAuth} from "../../hooks/AuthContext.jsx";
import {useState, useEffect} from "react";
import axios from "axios";

export default function UserCard({username}) {
    const {simpleUser} = UseAuth();
    const [user, setUser] = useState({});
    const [relationship, setRelationship] = useState({});
    const [error, setError] = useState("");
    const [isFollowing, setIsFollowing] = useState(false);

    const fetchUserData = async () => {
        try {
            let response = await axios.get(`http://localhost:8080/api/user/${username}`);
            setUser(response.data);

            response = await axios.get(`http://localhost:8080/api/relationship/${username}`);

            setRelationship(response.data);

            setIsFollowing(relationship.followers?.some(follower => follower.username === simpleUser.username));
        } catch (err) {
            setError("Failed to load user data: " + err.message);
            console.log(error);
        }
    };

    useEffect(() => {
        if (username) {
            fetchUserData();
        }
    }, [username, isFollowing]);

    const handleFollow = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.put(
                `http://localhost:8080/api/relationship/following?username=${simpleUser.username}&targetUsername=${user.username}`
            );

            if (response.status === 200) {
                setIsFollowing(true);
                setRelationship(prev => ({
                    ...prev,
                    followers: [...prev.followers, {username: simpleUser.username}]
                }));
            }
        } catch (err) {
            setError("Failed to follow user: " + err.message);
            console.log(error);
        }
    };

    const handleUnfollow = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.delete(
                `http://localhost:8080/api/relationship/following?username=${simpleUser.username}&targetUsername=${user.username}`
            );

            if (response.status === 200) {
                setIsFollowing(false);
                setRelationship(prev => ({
                    ...prev,
                    followers: prev.followers.filter(follower => follower.username !== simpleUser.username)
                }));
            }
        } catch (err) {
            setError("Failed to unfollow user: " + err.message);
            console.log(err);
        }
    };

    return (
        <div className = "shadow-2xl bg-accent w-full mt-6">
            <div className = {"flex flex-col items-center"}>
                <div className = "flex flex-row justify-center items-center p-3">
                    {user.avatar ? (
                        <img src = {user.avatar} alt = {user.username} className = "w-20 h-20 rounded-full"/>
                    ) : (
                        <span className = "loading loading-spinner loading-lg"></span>
                    )}
                    <div className = "flex flex-col">
                        <h1 className = "text-2xl font-semibold text-gray-800">
                            {user.displayName || null}
                        </h1>
                        <p className = "text-lg text-gray-600">{user.username || null}</p>
                    </div>
                </div>
                {user.username && simpleUser.username !== user.username && (
                    <div className = "flex flex-row justify-center items-center p-3 gap-2">
                        {!isFollowing ? (
                            <button onClick = {handleFollow} className = "btn btn-primary">Follow</button>
                        ) : (
                            <button onClick = {handleUnfollow} className = "btn btn-warning">Unfollow</button>
                        )}
                        <button className = "btn btn-secondary">Message</button>
                    </div>
                )}
            </div>
            <div className = "flex flex-row justify-center items-center p-3">
                <div className = "stats shadow">
                    <div className = "stat place-items-center">
                        <a href = "/follows" className = "stat-title">Followings</a>
                        <div className = "stat-value">
                            {relationship.following?.length ?? <span className = "loading loading-dots loading-xs"/>}
                        </div>
                    </div>
                    <div className = "stat place-items-center">
                        <a href = "/followers" className = "stat-title">Followers</a>
                        <div className = "stat-value">
                            {relationship.followers?.length ?? <span className = "loading loading-dots loading-xs"/>}
                        </div>
                    </div>
                    <div className = "stat place-items-center">
                        <a href = "/friends" className = "stat-title">Friends</a>
                        <div className = "stat-value">
                            {relationship.friends?.length ??
                                <span className = "loading loading-dots loading-xs"></span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
