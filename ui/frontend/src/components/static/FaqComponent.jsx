import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqItems = [
    {
        question: 'How do I donate items?',
        answer: 'You can register or log in to upload items for donation. Complete the form with item details and a picture if available.',
    },
    {
        question: 'How do I claim an item?',
        answer: 'Once you find an item you need, click on "Claim" to initiate the process. You will receive the donor’s contact details after claiming.',
    },
    {
        question: 'Is there a cost for using this platform?',
        answer: 'No, Doniraj is completely free to use for both donors and recipients.',
    },
];

const FaqComponent = () => {
    return (
        <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h3" gutterBottom>
                Frequently Asked Questions
            </Typography>
            {faqItems.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default FaqComponent;
