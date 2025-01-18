import React from 'react';
import { Box, Container, Grid, Typography, Link, ButtonGroup, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterComponent = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: 'primary.main', color: 'white', padding: '2rem 0' }}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>

                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Link href="/items" underline="hover" color="inherit">Items</Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Link href="/about" underline="hover" color="inherit">Who We Are</Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Link href="/profile" underline="hover" color="inherit">Profile</Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Link href="/contact" underline="hover" color="inherit">Contact Us</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <ButtonGroup>
                            <IconButton color="inherit" href="https://facebook.com" aria-label="Facebook">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" href="https://twitter.com" aria-label="Twitter">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton color="inherit" href="https://instagram.com" aria-label="Instagram">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton color="inherit" href="https://linkedin.com" aria-label="LinkedIn">
                                <LinkedInIcon />
                            </IconButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Typography variant="body2" align="center" sx={{ marginTop: '1rem' }}>
                    © 2024 Doniraj. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}

export default FooterComponent;
