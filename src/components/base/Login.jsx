import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UseAuth} from "../../hooks/AuthContext.jsx";

export default function Login() {
    const {login} = UseAuth();
    const [error, setError] = useState("");
    const [form, setForm] = useState({username: "", password: "", remember: false});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/user/login", form);
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

    return (
        <div className = "min-h-screen flex flex-col items-center justify-center bg-base-200">
            <div className = "card w-96 bg-base-100 shadow-xl">
                <div className = "card-body">
                    <h2 className = "text-center text-2xl font-bold">Welcome Back!</h2>

                    <form onSubmit = {handleSubmit} className = "space-y-4">
                        <div className = "form-control">
                            <label className = "label">
                                <span className = "label-text">Username</span>
                            </label>
                            <input
                                type = "text"
                                name = "username"
                                value = {form.username}
                                onChange = {handleChange}
                                placeholder = "Please enter your username"
                                className = "input input-bordered"
                                required
                            />
                        </div>

                        <div className = "form-control">
                            <label className = "label">
                                <span className = "label-text">Password</span>
                            </label>
                            <input
                                type = "password"
                                name = "password"
                                value = {form.password}
                                onChange = {handleChange}
                                placeholder = "Please enter your password"
                                className = "input input-bordered"
                                required
                            />
                        </div>

                        <div className = "form-control flex flex-row justify-between items-center">
                            <label className = "cursor-pointer flex items-center gap-2">
                                <input
                                    type = "checkbox"
                                    name = "remember"
                                    checked = {form.remember}
                                    onChange = {handleChange}
                                    className = "checkbox checkbox-primary"
                                />
                                <span className = "label-text">Remember me</span>
                            </label>
                            <a href = "#" className = "text-sm text-primary">Forget the password?</a>
                        </div>

                        <div className = "form-control">
                            <button className = "btn btn-primary w-full">Login</button>
                        </div>
                    </form>


                    <p className = "text-center text-sm">
                        New here? <a href = "/register" className = "text-primary">Register</a>
                    </p>
                </div>
            </div>
            {error && (
                <div role = "alert" className = "alert alert-error w-96 mt-2 text-center shadow-xl py-2 h-auto text-sm">
                    <svg
                        xmlns = "http://www.w3.org/2000/svg"
                        className = "h-5 w-5 shrink-0 stroke-current"
                        fill = "none"
                        viewBox = "0 0 24 24">
                        <path
                            strokeLinecap = "round"
                            strokeLinejoin = "round"
                            strokeWidth = "2"
                            d = "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};
