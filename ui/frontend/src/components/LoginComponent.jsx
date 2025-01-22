import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../services/AuthService";
import {Alert, Box, TextField, Typography} from "@mui/material";
import {Button} from "reactstrap";

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
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    name="password"
                    value={userDetails.password}
                    onChange={handleChange}
                    required
                />
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Login
                </Button>
            </form>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Not registered?{" "}
                <Link to="/register" underline="hover">
                    Register here
                </Link>
            </Typography>
        </Box>
    );
}

export default LoginComponent;
