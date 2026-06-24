import {useState} from "react";
import axios from "axios";
import Home from "./Home.jsx";
import RegistryPage from "./RegistryPage.jsx";

export default function LoginPage({onLoginSuccess}) {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [currentPage, setCurrentPage] = useState('login');


    const handleLogin = async (e) => {
        e.preventDefault()

        const res = await axios.post('http://localhost:5000/api/login', {
            username: username,
            password: password
        }).catch(error => alert("Wrong Username or Password"));

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.username);
        console.log(res.data.token)
        console.log("Logged in successfully as:", res.data.username);
        alert("Welcome back " + res.data.username + "!")
        if (onLoginSuccess) {
            onLoginSuccess();
        }
    }
    return (
        <>
            <form onSubmit={handleLogin}>
                <div style={{marginBottom: '10px'}}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{width: '100%', padding: '8px', marginTop: '5px'}}
                    />
                </div>

                <div style={{marginBottom: '15px'}}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{width: '100%', padding: '8px', marginTop: '5px'}}
                    />
                </div>

                <button type="submit" style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none'
                }}>
                    Sign In
                </button>
            </form>
            <nav style={{padding: '10px', background: '#eee', display: 'flex', gap: '10px'}}>
                <button onClick={() => setCurrentPage('registry')}>Sign up</button>
            </nav>
            <main style={{padding: '20px'}}>
                {currentPage === 'registry' && <RegistryPage/>}
            </main>
        </>
    )
}