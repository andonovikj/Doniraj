import React, { useEffect, useState } from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
import { getItem } from '../services/ItemService';
import { createClaim } from '../services/ClaimService';
import { Box, Typography, Button, CircularProgress, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import {jwtDecode} from "jwt-decode";
import AlertDialogSlide from "../components/AlertDialogSlide";

function ItemDetailsView() {

    const [item, setItem] = useState(null);
    const [userId, setUserId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.user_id);
            } catch (error) {
                console.log("Invalid token ", error);
            }

        }
    }, []);

    useEffect(() => {
        getItem(id)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    const handleClaim = async () => {
        const claimDto = {
            claimDate: '',
            status: 'CREATED',
            item_id: Number(id),
            recipient_id: userId
        };

        createClaim(claimDto)
            .then(() => {
                console.log("Item claimed successfully!");
                setDialogOpen(true);
                //navigator('/items');
            })
            .catch((error) => {
                console.error("Error claiming item:", error);
                alert(error.response?.data?.message || "Failed to claim item.");
            });
    };

    return (
        <Box sx={{ p: 4 }}>
            {item ? (
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src="/placeholder-image.jpg" // Replace with the real image source
                            alt={item.name}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                backgroundColor: '#f4f4f4',
                                objectFit: 'cover',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" gutterBottom>
                            {item.name}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            {item.description}
                        </Typography>
                        <Typography variant="body1">
                            <strong>City:</strong> {item.city.name}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            <strong>Donor:</strong> {item.donor.name}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<EmailIcon />}
                            onClick={handleClaim}
                            sx={{ padding: '10px 20px' }}
                        >
                            Claim This Item
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            )}
            {/* AlertDialogSlide */}
            <AlertDialogSlide open={dialogOpen} onClose={() => setDialogOpen(false)} item = {item} />
        </Box>
    );
}

export default ItemDetailsView;
