import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableItems } from '../services/ItemService';
import { Box, Card, CardContent, CardActions, Typography, Button, Grid, Alert } from '@mui/material';

function AvailableItems() {
    const [items, setItems] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAvailableItems()
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Available Items
            </Typography>
            <Grid container spacing={3}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.itemId}>
                            <Card sx={{ height: '100%', boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Date Published: {item.date_created}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Status: <span style={{ color: 'green', fontWeight: 'bold' }}>Available</span>
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigator(`/item/${item.item_id}`)}
                                    >
                                        View Item
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Alert severity="info" sx={{ textAlign: 'center' }}>
                            No items available at the moment.
                        </Alert>
                    </Grid>
                )}
            </Grid>
            <Button
                variant="contained"
                color="secondary"
                sx = {{marginTop: 5, justifyContent: 'center'}}
                onClick={() => navigator(`/item/add`)}
            >Donate an item!</Button>
        </Box>
    );
}

export default AvailableItems;
