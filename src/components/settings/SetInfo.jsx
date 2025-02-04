import {useState, useEffect} from "react";
import axios from "axios";
import {UseAuth} from "../../hooks/AuthContext.jsx";

export default function SetInfo() {
    const {simpleUser} = UseAuth();

    const [userData, setUserData] = useState({
        avatar: "", // 默认头像地址
        displayName: "",
        username: "",
        email: "",
        gender: "", // Male 或 Female
        createdDate: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (simpleUser?.username) {
            getUserData();
        }
    }, [simpleUser?.username]);

    const getUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/${simpleUser.username}?details=true`);
            console.log("User data fetched successfully:", response.data);
            setUserData(response.data);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserData((prev) => ({...prev, [name]: value}));
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/user/${simpleUser.username}`, userData);
            console.log("User data saved successfully:", response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save user data:", error);
        }
    };

    return (
        <div className = "bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto">

            {/* 头像 */}
            <div className = "mb-4 flex items-center">
                <img
                    src = {userData.avatar} // 默认头像
                    alt = "Avatar"
                    className = "w-16 h-16 rounded-full object-cover mr-4"
                />
                {isEditing ? (
                    <input
                        type = "url"
                        name = "avatar"
                        value = {userData.avatar}
                        onChange = {handleInputChange}
                        placeholder = "Avatar URL"
                        className = "border px-2 py-1 rounded w-full"
                    />
                ) : (
                    <p className = "text-gray-700">{userData.avatar ? "Avatar" : "No avatar set"}</p>
                )}
            </div>

            {/* 昵称 */}
            <div className = "mb-4">
                <label className = "block text-gray-700 font-medium mb-1">Display Name</label>
                {isEditing ? (
                    <input
                        type = "text"
                        name = "displayName"
                        value = {userData.displayName}
                        onChange = {handleInputChange}
                        className = "border px-3 py-2 rounded w-full"
                    />
                ) : (
                    <p className = "text-gray-700">{userData.displayName || "Not set"}</p>
                )}
            </div>

            {/* 用户名 */}
            <div className = "mb-4">
                <label className = "block text-gray-700 font-medium mb-1">Username</label>
                <p className = "text-gray-700">{userData.username}</p>
            </div>

            {/* 邮箱 */}
            <div className = "mb-4">
                <label className = "block text-gray-700 font-medium mb-1">Email</label>
                {isEditing ? (
                    <input
                        type = "email"
                        name = "email"
                        value = {userData.email}
                        onChange = {handleInputChange}
                        className = "border px-3 py-2 rounded w-full"
                    />
                ) : (
                    <p className = "text-gray-700">{userData.email || "Not set"}</p>
                )}
            </div>

            {/* 性别 */}
            <div className = "mb-4">
                <label className = "block text-gray-700 font-medium mb-1">Gender</label>
                {isEditing ? (
                    <select
                        name = "gender"
                        value = {userData.gender}
                        onChange = {handleInputChange}
                        className = "border px-3 py-2 rounded w-full"
                    >
                        <option value = "Male">Male</option>
                        <option value = "Female">Female</option>
                    </select>
                ) : (
                    <p className = "text-gray-700">{userData.gender || "Not set"}</p>
                )}
            </div>

            {/* 入站日期 */}
            <div className = "mb-4">
                <label className = "block text-gray-700 font-medium mb-1">CreatedDays</label>
                <p className = "text-gray-700">{userData.createdDays || "Not available"}</p>
            </div>

            {/* 按钮 */}
            <div className = "flex justify-end space-x-4">
                {isEditing ? (
                    <>
                        <button
                            onClick = {toggleEditing}
                            className = "px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick = {handleSave}
                            className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <button
                        onClick = {toggleEditing}
                        className = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
}
