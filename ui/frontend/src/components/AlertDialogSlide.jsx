import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import EmailIcon from "@mui/icons-material/Email";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Box, Checkbox, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getItem} from "../services/ItemService";
import {getUser} from "../services/UserService";
import {CheckBoxOutlineBlankRounded, CheckCircle, CheckCircleOutlineTwoTone, SearchOutlined} from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide({ open, onClose, item }) {
    //const [open, setOpen] = React.useState(false);

    //const navigator = useNavigate();

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleClose = () => {
    //     setOpen(false);
    //     //navigator('/items');
    // };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle justifyContent="center" direction="column"
                             alignItems="center" fontWeight="bold">{"ITEM CLAIMED SUCCESSFULLY"}<CheckCircleOutlineTwoTone /></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Below you can view all the necessary information.
                        Please contact the donor to collect your item.
                        Thank you for using Doniraj!
                    </DialogContentText>
                        <Box sx={{ mt: 2 }}>
                            {item && (
                                <>
                                    <Typography variant="body1">
                                        <strong>Item:</strong> {item.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Donor:</strong> {item.donor.name}, {item.donor.email}, {item.donor.phone_number}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>City:</strong> {item.city.name}
                                    </Typography>
                                </>)}
                        </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                            color="success"
                            size="medium"
                            sx={{
                                mr: 1,
                                mb: 1,
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "transparent"
                                }
                            }}
                            startIcon={<SearchOutlined />}
                            component={RouterLink}
                            to="/items"
                            onClick={onClose} >Keep browsing</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AlertDialogSlide;
