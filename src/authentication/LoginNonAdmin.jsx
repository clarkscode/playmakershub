import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  supabase,
} from "../database/supabase";

const LoginNonAdmin = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        setLoading(false);
        if (error) {
            setErrorMessage(error.message);
            console.error('Error logging in:', error.message);
            return;
        }

        // Successfully logged in
        console.log('Logged in:', data);
        
        // Redirect
        onLoginSuccess();
        navigate('/homepage');

    };

    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'radial-gradient(circle at 25% center, #5C1B33, transparent 85%), radial-gradient(circle at 75% center, #2618A7, transparent 80%)',
                backgroundColor: '#ad7c7c',
                margin: 0,
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-150px', alignItems: 'center', paddingBottom: '2rem' }}>
                <img
                    src="playmakerslogo.png"
                    alt="Playmakers Logo"
                    style={{ width: '32%', height: 'auto' }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                <form
                    id="login-form"
                    onSubmit={handleLogin}
                    style={{
                        borderRadius: '20px',
                        width: '500px',
                        height: '105%',
                        padding: '40px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <p
                        className="form-header"
                        style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: '2rem',
                            fontWeight: 700,
                            marginBottom: '30px',
                            color: 'white',
                        }}
                    >
                        Welcome to <br />
                        Playmakers - USTP
                    </p>
                    <fieldset style={{ borderStyle: 'none', width: '100%', marginBottom: '30px' }}>
                        <label htmlFor="email" id="email-label" style={{ width: '100%' }}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    display: 'block',
                                    marginBottom: '20px',
                                    height: '45px',
                                    color: 'black',
                                    width: '100%',
                                    borderRadius: '50px',
                                    padding: '5px 15px',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            />
                        </label>
                        <label htmlFor="password" id="password-label" style={{ width: '100%' }}>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    display: 'block',
                                    marginBottom: '20px',
                                    height: '45px',
                                    width: '100%',
                                    color: 'black',
                                    borderRadius: '50px',
                                    padding: '5px 15px',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            />
                        </label>
                    </fieldset>
                    {errorMessage && (
                        <p style={{ fontSize: '16px' , color: '#ea2323', marginTop: '-40px', marginBottom: '40px' }}>{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        id="login"
                        style={{
                            height: '48px',
                            width: '40%',
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            marginTop: '-30px'
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default LoginNonAdmin;
