import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {UseAuth} from "../hooks/AuthContext.jsx";
import axios from "axios";

export default function LoginForm() {
    const {login} = UseAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/user/login", {username, password});
            if (response.status === 200) {
                login(response.data.user)
                navigate("/")
            } else {
                setError("Login failed. Please try again.")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
            console.log(error)
        }
    };

    return (<div className = "flex items-center justify-center min-h-screen bg-gray-100">
        <div className = "w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
            <h2 className = "text-2xl font-bold text-center">Log in</h2>
            <form onSubmit = {handleLogin} className = "space-y-4">
                <div>
                    <label htmlFor = "username" className = "block text-sm font-medium">
                        Username
                    </label>
                    <input
                        type = "username"
                        id = "username"
                        className = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder = "Please enter your username"
                        required
                        onChange = {(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor = "password" className = "block text-sm font-medium">
                        Password
                    </label>
                    <input
                        type = "password"
                        id = "password"
                        className = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder = "Please enter your password"
                        required
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type = "submit"
                    className = "w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    Log in
                </button>
                {error && <p className = "text-red-500 text-sm text-center">{error}</p>}
            </form>
            <div className = "text-sm text-center">
                <Link to = "/forgot-password" className = "text-blue-500 hover:underline">
                    FORGET THE PASSWORD?
                </Link>
            </div>
            <div className = "text-sm text-center">
                New Here？
                <Link to = "/register" className = "text-blue-500 hover:underline">
                    Register
                </Link>
            </div>
        </div>
    </div>);
}