import React, {useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {logoutUser} from "../services/AuthService";

const HeaderComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set true if token exists, false otherwise
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // const handleLogout = () => {
    //     logoutUser().then(console.log("User logged out")).catch((error) => {
    //         console.log(error)
    //     } )
    //     handleMenuClose();
    //     navigator('/login');
    // }
    const handleLogout = async () => {
        try {
            await logoutUser();  // Ensure the logout request completes
            console.log("User logged out");
            handleMenuClose();
            localStorage.removeItem('token');  // Clear token
            setIsLoggedIn(false);
            navigator('/items');  // Navigate after logout
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    return (
        <AppBar position="static" color="primary" style={{ marginBottom: 40 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <RouterLink to="/items" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Doniraj
                    </RouterLink>
                </Typography>
                <Button color="inherit" component={RouterLink} to="/items">Home</Button>
                <Button color="inherit" component={RouterLink} to="/about">About Us</Button>
                <Button color="inherit" component={RouterLink} to="/contact">Contact Us</Button>
                <Button color="inherit" component={RouterLink} to="/faq">FAQ</Button>
                {!isLoggedIn && (
                    <>
                    <Button color="inherit" component={RouterLink} to="/register">Register</Button>
                    <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <IconButton color="inherit" onClick={handleMenuClick}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose} component={RouterLink} to="/profile">
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default HeaderComponent;
