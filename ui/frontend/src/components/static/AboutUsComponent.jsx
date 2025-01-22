import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';

const teamMembers = [
    {
        name: 'Jane Doe',
        role: 'Founder & CEO',
        image: '/placeholder-avatar.png',
    },
    {
        name: 'John Smith',
        role: 'Technical Lead',
        image: '/placeholder-avatar.png',
    },
    {
        name: 'Emily Johnson',
        role: 'Marketing Manager',
        image: '/placeholder-avatar.png',
    },
];

const AboutUsComponent = () => {
    return (
        <Box sx={{ p: 4, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
                About Us
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                Welcome to Doniraj, a platform designed to connect donors and recipients to foster generosity
                and help those in need. Our mission is to provide an easy and efficient way to donate and receive
                essential items, promoting a culture of kindness and community support.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Our Mission
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                We strive to build a platform where no item goes to waste, and every person has access to
                the resources they need. By connecting donors with those in need, we aim to create a more
                sustainable, compassionate world.
            </Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Meet the Team
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card elevation={2}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Avatar
                                    sx={{ width: 100, height: 100, margin: '0 auto' }}
                                    src={member.image}
                                    alt={member.name}
                                />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    {member.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {member.role}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AboutUsComponent;
