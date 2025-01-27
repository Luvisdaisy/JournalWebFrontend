import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Password do not match.");
            return;
        }

        const userData = {
            username,
            email,
            password,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/user/register", userData);
            if (response.status === 201) {
                navigate("/login");
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (err) {
            setError("Server error. Please try again later.");
        }
    }

    return (
        <div className = "flex items-center justify-center min-h-screen bg-gray-100">
            <div className = "w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className = "text-2xl font-bold text-center">New Account</h2>
                <form className = "space-y-4" onSubmit = {handleRegister}>
                    <div>
                        <label htmlFor = "username" className = "block text-sm font-medium">
                            Username
                        </label>
                        <input
                            type = "text"
                            id = "username"
                            className = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder = "Please enter username"
                            value = {username}
                            onChange = {(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor = "email" className = "block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type = "email"
                            id = "email"
                            className = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder = "Please enter email"
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            required
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
                            placeholder = "Please enter password"
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor = "confirmPassword"
                            className = "block text-sm font-medium"
                        >
                            Confirm Password
                        </label>
                        <input
                            type = "password"
                            id = "confirmPassword"
                            className = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder = "Please enter password again"
                            onChange = {(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className = "text-red-500 text-sm">{error}</p>}
                    <button
                        type = "submit"
                        className = "w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
                <div className = "text-sm text-center">
                    Already have an account？
                    <Link to = "/login" className = "text-blue-500 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}