import React, { useEffect, useState } from 'react';
import {getClaims, getClaimsByRecipient} from "../services/ClaimService";
import { jwtDecode } from "jwt-decode";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";

function RecipientClaimListView() {
    const [claims, setClaims] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);

            getClaimsByRecipient(decodedToken.user_id)
                .then((response) => {
                    setClaims(response.data);
                })
                .catch((error) => {
                    console.log("Error fetching claims:", error);
                });
        }
    }, []);


    // Filter claims for the logged-in recipient
    // useEffect(() => {
    //     if (recipientId) {
    //         const recipientClaims = claims.filter(
    //             (claim) => claim.recipient.user_id === recipientId
    //         );
    //         setFilteredClaims(recipientClaims); // Store filtered claims
    //     }
    // }, [claims, recipientId]);

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                My Claims
            </Typography>

            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Claim Date</strong></TableCell>
                            <TableCell><strong>Claim Item</strong></TableCell>
                            <TableCell><strong>Claim Recipient</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {claims.length > 0 ? (
                            claims.map((claim) => (
                                <TableRow key={claim.id}>
                                    <TableCell>{claim.claimDate}</TableCell>
                                    <TableCell>{claim.item.name}</TableCell>
                                    <TableCell>{claim.recipient.name}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No claims found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default RecipientClaimListView;
