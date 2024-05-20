import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Popover } from '@mui/material';
import axios from 'axios';

const PasswordPopover = ({ anchorEl, handleClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            >
                <Box sx={{ p: 2, maxWidth: 300 }}>
                    <Typography component="h1" variant="h5">Forgot Password</Typography>
                    <form onSubmit={handleForgotPassword}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Send Reset Link
                        </Button>
                    </form>
                    {message && <Typography variant="body2">{message}</Typography>}
                </Box>
        </Popover>
    );
};

export default PasswordPopover;
