import React from "react";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useState } from "react";
const FormDialog = ({
    open,
    setOpen,
    dialogTitle,
    dialogContentText,
    infotext,
    loading,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [formData, setFormData] = useState({});

    const handleClose = () => {
        setOpen(false);
        setFormData({});
    };


    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
            <DialogContentText>{dialogContentText}</DialogContentText>
            <Box component="form" id="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    {infotext && (
                        <Grid item xs={12} mt={2}>
                            <Alert severity="info">{infotext}</Alert>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button
                onClick={handleClose}
                sx={{
                    color: colors.grey[100],
                }}
            disabled={loading}
            >
                OK
            </Button>
        </DialogActions>
    </Dialog>
    );
};

export default FormDialog;
