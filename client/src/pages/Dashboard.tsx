import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Grid, IconButton, InputAdornment } from '@mui/material';

const Dashboard: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [appId, setAppId] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [fyId, setFyId] = useState('');
    const [totp, setTotp] = useState('');
    const [pin, setPin] = useState('');
    const [showSecretKey, setShowSecretKey] = useState(false);
    const [showTotp, setShowTotp] = useState(false);
    const [showPin, setShowPin] = useState(false);
    const [appIdError, setAppIdError] = useState(false);
    const [secretKeyError, setSecretKeyError] = useState(false);
    const [fyIdError, setFyIdError] = useState(false);
    const [totpError, setTotpError] = useState(false);
    const [pinError, setPinError] = useState(false);


    const handleClose = async () => {
        // Clear previos errors
        setAppIdError(false);
        setSecretKeyError(false);
        setFyIdError(false);
        setTotpError(false);
        setPinError(false);

        let hasErrors = false;

        // Check if fields are empty
        if (!appId) {
            setAppIdError(true);
            hasErrors = true;
        }
        if (!secretKey) {
            setSecretKeyError(true);
            hasErrors = true;
        }
        if (!fyId) {
            setFyIdError(true);
            hasErrors = true;
        }
        if (!totp) {
            setTotpError(true);
            hasErrors = true;
        }
        if (!pin || pin.length !== 4) {
            setPinError(true);
            hasErrors = true;
        }

        // If any field is empty or pin length is not 4, return
        if (hasErrors) {
            return;
        }


        // Send these credentials to your backend for authentication
        try {
            const response = await axios.post('http://127.0.0.1:5000/dashboard', {
                appId,
                secretKey,
                fyId,
                totp,
                pin
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }

        // If everything is fine, close the modal
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        handleClose();
                    }
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',

                        }}>
                            <h2 id="modal-modal-title">Enter your Fyers API credentials</h2>
                            <TextField
                                id="app-id-input"
                                label="App ID"
                                variant="outlined"
                                fullWidth
                                value={appId}
                                onChange={(e) => setAppId(e.target.value)}
                                error={appIdError}
                                helperText={appIdError ? 'App ID is required' : ''}
                            />
                            <TextField
                                id="secret-key-input"
                                label="Secret Key"
                                variant="outlined"
                                fullWidth
                                type={showSecretKey ? 'text' : 'password'}
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                error={secretKeyError}
                                helperText={secretKeyError ? 'Secret Key is required' : ''}
                                style={{ marginTop: '1rem' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label="toggel password Visibility"
                                                onClick={() => setShowSecretKey(!showSecretKey)}>
                                                {showSecretKey ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                id="fy-id-input"
                                label="FY ID"
                                variant="outlined"
                                fullWidth
                                value={fyId}
                                onChange={(e) => setFyId(e.target.value)}
                                error={fyIdError}
                                helperText={fyIdError ? 'Fyers ID is required' : ''}
                                style={{ marginTop: '1rem' }}
                            />
                            <TextField
                                id="totp-input"
                                label="TOTP"
                                variant="outlined"
                                fullWidth
                                type={showTotp ? 'text' : 'password'}
                                value={totp}
                                onChange={(e) => setTotp(e.target.value)}
                                error={totpError}
                                helperText={totpError ? 'Totp is required' : ''}
                                style={{ marginTop: '1rem' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label="toggel password Visibility"
                                                onClick={() => setShowTotp(!showTotp)}
                                            >
                                                {showTotp ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                id="pin-input"
                                label="PIN"
                                variant="outlined"
                                fullWidth
                                type={showPin ? 'text' : 'password'}
                                value={pin}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                    setPin(onlyNums);
                                }}
                                error={pinError}
                                helperText={pinError ? (pin.length !== 4 ? 'PIN must be 4 digits' : 'PIN is required') : ''}
                                style={{ marginTop: '1rem' }}
                                inputProps={{
                                    maxLength: 4,
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton aria-label='toggel password Visibility'
                                                onClick={() => setShowPin(!showPin)}>
                                                {showPin ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleClose}
                                style={{ marginTop: '1rem' }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
};

export default Dashboard;