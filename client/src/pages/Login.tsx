import React, { useState } from 'react';
import {
    Typography,
    Button,
    Container,
    Box,
    Grid
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import axios from 'axios';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username,
                password,
            });
            // Handle successful login response
            console.log('Login successful:', response.data);
            navigate('/dashboard');
        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
            setLoginError(true);
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
                Login
            </Typography>
            <form>
                <Grid container
                    spacing={2}>
                    <FormField label="Username"
                        value={username}
                        onChange={setUsername} />
                    <FormField label="Password"
                        value={password}
                        onChange={setPassword}
                        type="password" />
                </Grid>
                <Button variant="contained" color="primary"
                    onClick={handleLogin}
                    sx={
                        { marginTop: '16px' }
                    }>
                    Login
                </Button>
                {loginError && (
                    <Typography variant="body1" color="error">
                        Username/email or password is incorrect. Please try again.
                    </Typography>
                )}
            </form>
            <Box sx={
                {
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: 2
                }
            }>
                <Typography variant="body2" gutterBottom>
                    Don't have an account?
                    <Link to="/signup">Sign Up</Link>
                </Typography>
            </Box>
        </Box>
    </Container>);
};

export default Login;