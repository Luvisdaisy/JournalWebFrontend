import {useState} from "react";
import {UseAuth} from "../hooks/AuthContext.jsx";

export default function Header() {
    const {isAuthenticated, logout, simpleUser} = UseAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <header className = "w-full bg-white shadow-md">
            <div className = "container mx-auto flex items-center justify-between px-4 py-3">
                <div className = "text-xl font-bold text-blue-500">
                    <a href = "/">MyLogo</a>
                </div>

                <nav>
                    <ul className = "flex space-x-4 items-center">
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <a
                                        href = "#notice"
                                        className = "text-gray-600 hover:text-blue-500 transition"
                                    >
                                        Notice
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href = "#message"
                                        className = "text-gray-600 hover:text-blue-500 transition"
                                    >
                                        Message
                                    </a>
                                </li>
                                <li className = "relative">
                                    <button
                                        onClick = {toggleDropdown}
                                        className = "flex items-center focus:outline-none"
                                    >
                                        <img
                                            src = {simpleUser.avatar}
                                            alt = "User Avatar"
                                            className = "w-8 h-8 rounded-full"
                                        />
                                    </button>

                                    {isDropdownOpen && (
                                        <div
                                            className = "absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50"
                                            onMouseLeave = {closeDropdown}
                                        >
                                            <ul className = "py-2">
                                                <li>
                                                    <a
                                                        href = "/profile"
                                                        className = "block px-4 py-2 text-gray-700 hover:bg-blue-100 transition"
                                                    >
                                                        Profile
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href = "/settings"
                                                        className = "block px-4 py-2 text-gray-700 hover:bg-blue-100 transition"
                                                    >
                                                        Settings
                                                    </a>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick = {(e) => {
                                                            e.preventDefault();
                                                            logout();
                                                            closeDropdown();
                                                        }}
                                                        className = "block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100 transition"
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            </>
                        ) : (
                            <li>
                                <a
                                    href = "/login"
                                    className = "text-gray-600 hover:text-blue-500 transition"
                                >
                                    Login
                                </a>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
