import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import { Divider } from '@mui/material';

function TermsAndConditionsComponent() {
    return (
        <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Terms and Conditions
                </Typography>

                <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
                    Effective Date: October 31, 2024
                </Typography>

                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        1. General Overview
                    </Typography>
                    <Typography paragraph>
                        By using this platform, you agree to act respectfully and in good faith towards all users.
                        This platform is designed to facilitate a safe and positive environment for everyone. Any misuse,
                        harassment, or violation of these principles may result in termination of your account or
                        legal consequences.
                    </Typography>
                    <Divider></Divider>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        2. Responsibilities of Users
                    </Typography>
                    <Typography paragraph>
                        - Users are expected to provide accurate information when signing up and claiming items. <br/>
                        - Donations must be made in good condition and with the intent to genuinely help others. <br/>
                        - Recipients must ensure they only claim items they genuinely need and avoid overclaiming. <br/>
                        - All parties must follow applicable local laws and regulations.
                    </Typography>
                    <Divider></Divider>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        3. Prohibited Activities
                    </Typography>
                    <Typography paragraph>
                        - Fraudulent activities, including creating fake claims or offering false items. <br/>
                        - Uploading offensive, illegal, or harmful content to the platform. <br/>
                        - Using the platform to harm, deceive, or exploit other users.
                    </Typography>
                    <Divider></Divider>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        4. Liability Disclaimer
                    </Typography>
                    <Typography paragraph>
                        The platform operates on a goodwill basis and does not assume responsibility for any disputes
                        between users. We are not liable for any loss, damage, or injury resulting from the use of the
                        platform. Users are advised to exercise caution when interacting with others.
                    </Typography>
                    <Divider></Divider>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        5. Modifications and Updates
                    </Typography>
                    <Typography paragraph>
                        These terms may be updated periodically. Continued use of the platform signifies your agreement
                        to the most recent terms and conditions. We encourage users to review these terms regularly.
                    </Typography>
                    <Divider></Divider>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        6. Contact Us
                    </Typography>
                    <Typography paragraph>
                        If you have any questions, concerns, or complaints about these terms, feel free to contact us
                        at support@doniraj.com. Your feedback is always welcome.
                    </Typography>
                    <Divider></Divider>
                    <Typography variant="caption" display="block" align="center" color="text.secondary" sx={{ marginTop: 3 }}>
                        "Creating a better world, one item at a time."
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default TermsAndConditionsComponent;
