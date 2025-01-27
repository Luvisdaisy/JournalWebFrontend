import {Navigate} from "react-router-dom";
import {UseAuth} from "../hooks/AuthContext.jsx";

const protectedRoute = ({children}) => {
    const {isAuthenticated} = UseAuth();
    return isAuthenticated ? children : <Navigate to = "/login"/>;
}

export default protectedRoute;