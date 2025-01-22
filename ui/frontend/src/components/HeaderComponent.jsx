import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HeaderComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
                    <MenuItem onClick={handleMenuClose} component={RouterLink} to="/logout">
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderComponent;
