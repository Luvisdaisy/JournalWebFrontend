import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({username: "", password: "", email: ""});
    const [error, setError] = useState("das");
    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev, [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/api/user/register", form);
            if (response.status === 201) {
                navigate("/login");
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (err) {
            setError(err);
        }
    }

    return (<div className = {"min-h-screen flex flex-col items-center justify-center bg-base-200"}>
        <div className = {"card w-96 bg-base-100 shadow-xl"}>
            <div className = {"card-body"}>
                <h2 className = {"text-center text-2xl font-bold"}>Welcome to Journal!</h2>

                <form onSubmit = {handleSubmit} className = {"space-y-4"}>
                    <div className = {"form-control"}>
                        <label className = {"label"}>
                            <span className = {"label-text"}>Username</span>
                        </label>
                        <input
                            type = {"text"}
                            name = {"username"}
                            value = {form.username}
                            onChange = {handleChange}
                            placeholder = {"Please enter your username"}
                            className = {"input input-bordered"}
                            required/>
                    </div>
                    <div className = {"form-control"}>
                        <label className = {"label"}>
                            <span className = {"label-text"}>Email</span>
                        </label>
                        <input
                            type = {"email"}
                            name = {"email"}
                            value = {form.email}
                            onChange = {handleChange}
                            placeholder = {"Please enter your email"}
                            className = {"input input-bordered"}
                            required/>
                    </div>
                    <div className = {"form-control"}>
                        <label className = {"label"}>
                            <span className = {"label-text"}>Password</span>
                        </label>
                        <input
                            type = {"password"}
                            name = {"password"}
                            value = {form.password}
                            onChange = {handleChange}
                            placeholder = {"Please enter your password"}
                            className = {"input input-bordered"}
                            required/>
                    </div>
                    <div className = {"form-control"}>
                        <button type = {"submit"} className = {"btn btn-primary"}>Register</button>
                    </div>
                </form>
                <p className = "text-center text-sm">
                    Already have an account? <a href = "/login" className = "text-primary">Login</a>
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
    </div>);
}