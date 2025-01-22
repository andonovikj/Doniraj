import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/UserService';
//import jwtDecode from "jwt-decode"; // Removed braces for proper import
import { jwtDecode } from "jwt-decode";
import { Box, Typography, Button, Avatar, Grid } from '@mui/material';

function UserDetailsView() {
    const [user, setUser] = useState(null);
    const navigator = useNavigate();

    const token = localStorage.getItem("token");
    let userId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.user_id; // Ensure your JWT contains `user_id`
    }

    useEffect(() => {
        if (userId) {
            getUser(userId)
                .then((response) => setUser(response.data))
                .catch((error) => console.error(error));
        }
    }, [userId]);

    return (
        <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto' }}>
            {user ? (
                <>
                    <Box display="flex" alignItems="center" mb={4}>
                        <Avatar
                            sx={{ width: 100, height: 100, marginRight: 2 }}
                            alt={user.name}
                            src="/placeholder-avatar.png"
                        />
                        <Box>
                            <Typography variant="h4" component="div" gutterBottom>
                                {user.name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {user.city.name}
                            </Typography>
                        </Box>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1">
                                <strong>Email:</strong> {user.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1">
                                <strong>Phone Number:</strong> {user.phone_number}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => navigator(`/user/update/${user.user_id}`)}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                </>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <Typography variant="h6">Loading...</Typography>
                </Box>
            )}
        </Box>
    );
}

export default UserDetailsView;
