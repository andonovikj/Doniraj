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

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide({ open, onClose }) {
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
                <DialogTitle>{"Item claimed successfully!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Check your e-mail for more information. Thank you for using Doniraj!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button component={RouterLink} to="/items"
                        onClick={onClose} >Keep browsing</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AlertDialogSlide;
