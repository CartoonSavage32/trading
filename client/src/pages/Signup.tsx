import React, { useState } from 'react';
import axios from 'axios'
import FormField from '../components/FormField';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Snackbar
} from '@mui/material';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        // Clear previous errors
        setUsernameError(false);
        setNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);

        // Check if fields are empty
        if (!username) {
            setUsernameError(true);
        }
        if (!name) {
            setNameError(true);
        }
        if (!lastName) {
            setLastNameError(true);
        }
        if (!email) {
            setEmailError(true);
        }
        if (!password) {
            setPasswordError(true);
        }
        if (!confirmPassword) {
            setConfirmPasswordError(true);
        }

        // If any field is empty, return
        if (usernameError || nameError || lastNameError || emailError || passwordError || confirmPasswordError) {
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        } else {
            setPasswordMatchError(false);
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', {
                name,
                lastName,
                username,
                email,
                password,
                confirmPassword
            });
            // If successful, reset form
            setName('');
            setLastName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            // Handle successful signup response
            console.log('Signup successful:', response.data);
            setSignupSuccess(true);

            if (response.status === 200) {
                navigate('/login');
            }

        } catch (error) {
            // Handle signup error
            console.error('Signup error:', error)
        }
    };

    return (<Container maxWidth="sm">
        <Box sx={
            {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '20vh'
            }
        }>
            <Typography variant="h4" gutterBottom>
                Signup
            </Typography>
            <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                <Snackbar
                    open={signupSuccess}
                    autoHideDuration={10000}
                    onClose={() => setSignupSuccess(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSignupSuccess(false)} severity="success" sx={{ width: '100%' }}>
                        Signup successful!
                    </Alert>
                </Snackbar>
                <Grid container
                    spacing={2}>
                    <Grid item
                        xs={6}>
                        <FormField label="First Name"
                            value={name}
                            onChange={setName}
                            error={nameError}
                            helperText={nameError ? 'First name is required ' : ''}
                        />
                    </Grid>
                    <Grid item
                        xs={6}>
                        <FormField label="Last Name"
                            value={lastName}
                            onChange={setLastName}
                            error={lastNameError}
                            helperText={lastNameError ? 'Last name is required ' : ''}
                        />
                    </Grid>
                    <Grid item
                        xs={12}>
                        <FormField label="Username"
                            value={username}
                            onChange={setUsername}
                            error={usernameError}
                            helperText={usernameError ? 'Username is required ' : ''}
                        />
                    </Grid>
                    <Grid item
                        xs={12}>
                        <FormField label="Email Address"
                            value={email}
                            onChange={setEmail}
                            type="email"
                            error={emailError}
                            helperText={emailError ? 'Invalid email format' : ''}
                        />
                    </Grid>
                    <Grid item
                        xs={12}>
                        <FormField label="Password"
                            value={password}
                            onChange={setPassword}
                            type="password"
                            error={passwordError}
                            helperText={passwordError ? 'Password must contain at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character' : ''}
                        />
                    </Grid>
                    <Grid item
                        xs={12}>
                        <FormField label="Confirm Password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            type="password"
                            error={confirmPasswordError || passwordMatchError}
                            helperText={confirmPasswordError ? 'Confirm password is required' : (passwordMatchError ? 'Passwords do not match' : '')}
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary"
                    type="submit"
                    sx={
                        { marginTop: '16px' }
                    }>
                    Signup
                </Button>
            </form>
        </Box>
    </Container>);
};

export default SignupForm;