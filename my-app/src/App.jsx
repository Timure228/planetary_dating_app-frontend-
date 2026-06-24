import {useEffect, useState} from 'react'
import './App.css'
import Home from "./components/Home.jsx";
import SwipePage from "./components/SwipePage.jsx";
import RegistryPage from "./components/RegistryPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import WhoLikedMe from "./components/WhoLikedMe.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentPage, setCurrentPage] = useState('home');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true)
        }
    }, []);
    if (!isLoggedIn) {
        return (<LoginPage onLoginSuccess={() => setIsLoggedIn(true)}/>)
    }

    return (
        <>
            {localStorage.getItem('token') && (
                <button
                    onClick={handleLogout}
                    style={{ marginLeft: 'auto', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            )}
            <nav style={{padding: '10px', background: '#eee', display: 'flex', gap: '10px'}}>
                <button onClick={() => setCurrentPage('home')}>Home</button>
                <button onClick={() => setCurrentPage('login')}>Login</button>
                <button onClick={() => setCurrentPage('register')}>Register</button>
                <button onClick={() => setCurrentPage('swipe')}>Swipe</button>
                <button onClick={() => setCurrentPage('likes')}>Likes</button>
            </nav>
                <h3>Logged in as {localStorage.getItem("username")}</h3>

            <main style={{padding: '20px'}}>
                {currentPage === 'home' && <Home/>}
                {currentPage === 'login' && <LoginPage navigateTo={setCurrentPage}/>}
                {currentPage === 'register' && <RegistryPage navigateTo={setCurrentPage}/>}
                {currentPage === 'swipe' && <SwipePage/>}
                {currentPage === 'likes' && <WhoLikedMe/>}
            </main>
        </>
    )
}

export default App
