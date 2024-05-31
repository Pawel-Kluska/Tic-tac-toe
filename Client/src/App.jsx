import "./App.css";
import Navbar from "./Navbar/Navbar.jsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import TitleScreen from "./TitleScreen.jsx";
import {API_BASE_URL} from "./constants/index.js";
import axiosHttp from "./axios.jsx";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));
    const location = useLocation();
    const Login = async (code) => {
        const body = {
            code: code
        }

        try {
            const response = await axiosHttp.post("/login", body)
            return response.data;

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const LogOut = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        if (code) {
            localStorage.setItem('code', code);
            Login(code).then(r => {
                setIsLoggedIn(true);
                localStorage.setItem("access_token", r.access_token);
                localStorage.setItem("refresh_token", r.refresh_token);
                localStorage.setItem("id_token", r.id_token);
            });
        }
    }, [location.search]);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} onLogout={LogOut}/>
            <TitleScreen isLoggedIn={isLoggedIn}/>
        </div>
    );
}

export default App;

