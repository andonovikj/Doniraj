import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../services/AuthService";

function LoginComponent() {
    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // loginUser(userDetails)
        //     .then((response) => {
        //         localStorage.setItem('token', response.data.token);
        //         console.log("User logged in successfully:", response.data);
        //         navigate("/items"); // Redirect to the available items page after login
        //     })
        //     .catch((error) => {
        //         console.error("Error logging in user:", error.response?.data || error);
        //         setError(error.response?.data?.message || "Login failed.");
        //     });
        try {
            const response = await loginUser(userDetails);
            if (response.data !== 'Invalid credentials') {
                localStorage.setItem('token', response.data);
                navigate('/items');
            } else {
                setError(error.response?.data?.message || "Invalid credentials.");
                console.log('Invalid credentials');
            }
        } catch (error) {
            setError(error.response?.data?.message || "Invalid credentials.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <form className="mt-4" onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={userDetails.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
            <div className="mt-3">
                <span>Not registered? <Link to="/register">Register here</Link></span>
            </div>
        </div>
    );
}

export default LoginComponent;
