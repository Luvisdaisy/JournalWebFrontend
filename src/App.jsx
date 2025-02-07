import {Routes, Route, BrowserRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {AuthProvider} from "./hooks/AuthContext.jsx";
import ProtectedRoute from "./route/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import Navbar from "./components/base/Navbar.jsx";
import UserSummary from "./components/user/UserSummary.jsx";

export default function App() {
    return (
        <div className = {"App"}>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar/>
                    <Routes>
                        <Route path = "/login" element = {<LoginPage/>}/>
                        <Route path = "/register" element = {<RegisterPage/>}/>
                        <Route path = "/" element = {
                            <ProtectedRoute>
                                <HomePage/>
                            </ProtectedRoute>
                        }/>
                        <Route path = "/u/:username" element = {
                            <ProtectedRoute>
                                <UserSummary/>
                            </ProtectedRoute>}
                        />
                        <Route path = "/settings" element = {
                            <ProtectedRoute>
                                <SettingPage/>
                            </ProtectedRoute>
                        }/>
                        <Route path = {"/new"} element = {<UserSummary/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}