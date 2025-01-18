import React from 'react';
import { Grid, Typography, ButtonGroup, IconButton, Container, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterComponent = () => {
    return (
        <footer style={{ backgroundColor: '#1976d2', color: '#fff', padding: '20px 0' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Column 1: App Description */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Doniraj
                        </Typography>
                        <Typography variant="body2">
                            Doniraj is a web platform where users can donate items or clothing, and others in need can claim them. Our mission is to make sharing and helping easy, accessible, and impactful for everyone.
                        </Typography>
                    </Grid>

                    {/* Column 2: Navigation Links */}
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li><Link href="/" color="inherit">Home</Link></li>
                            <li><Link href="/about" color="inherit">About Us</Link></li>
                            <li><Link href="/contact" color="inherit">Contact Us</Link></li>
                            <li><Link href="/faq" color="inherit">FAQ</Link></li>
                        </ul>
                    </Grid>

                    {/* Column 3: Social Media Icons */}
                    <Grid item xs={12} sm={5}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <div>
                            <IconButton href="mailto:contact@doniraj.com" color="inherit">
                                <EmailIcon />
                            </IconButton>
                            <IconButton href="https://facebook.com" target="_blank" color="inherit">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton href="https://instagram.com" target="_blank" color="inherit">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton href="https://linkedin.com" target="_blank" color="inherit">
                                <LinkedInIcon />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
                    © 2024 Doniraj. All rights reserved.
                </Typography>
            </Container>
        </footer>
    );
};

export default FooterComponent;
