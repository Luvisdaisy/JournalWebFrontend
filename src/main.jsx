import {createRoot} from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import {AuthProvider} from "./hooks/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App/>
    </AuthProvider>
)
