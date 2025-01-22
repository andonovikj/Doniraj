import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactComponent = () => {
    return (
        <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                We are here to help! If you have any questions, need assistance, or want to learn more about Doniraj, feel free to reach out to us.
            </Typography>
            <List>
                <ListItem>
                    <EmailIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Email" secondary="support@doniraj.com" />
                </ListItem>
                <ListItem>
                    <PhoneIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Phone" secondary="+123 456 7890" />
                </ListItem>
                <ListItem>
                    <LocationOnIcon sx={{ mr: 2 }} />
                    <ListItemText primary="Address" secondary="123 Donor Street, Kindness City, Country" />
                </ListItem>
            </List>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                We look forward to hearing from you!
            </Typography>
        </Box>
    );
};

export default ContactComponent;
