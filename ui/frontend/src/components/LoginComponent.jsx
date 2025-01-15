import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../services/UserService";

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

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(userDetails)
            .then((response) => {
                console.log("User logged in successfully:", response.data);

                // Store token in localStorage or sessionStorage
                //localStorage.setItem("token", response.data.token);

                navigate("/items/available"); // Redirect to the available items page after login
            })
            .catch((error) => {
                console.error("Error logging in user:", error.response?.data || error);
                setError(error.response?.data?.message || "Login failed.");
            });
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
        </div>
    );
}

export default LoginComponent;
