import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import FormField from '../components/FormField';
import axios from 'axios'

const SignupForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', {
                name,
                lastName,
                username,
                email,
                selectedDate,
                password,
                confirmPassword
            });
            // Handle successful signup response
            console.log('Signup successful:', response.data);
        } catch (error) {
            // Handle signup error
            console.error('Signup error:', error)
        }
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
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
            <form>
                <Grid container
                    spacing={2}>
                    <Grid item
                        xs={6}>
                        <FormField label="First Name"
                            value={name}
                            onChange={setName} />
                    </Grid>
                    <Grid item
                        xs={6}>
                        <FormField label="Last Name"
                            value={lastName}
                            onChange={setLastName} />
                    </Grid>
                    <Grid item
                        xs={12}>
                        <FormField label="Username"
                            value={username}
                            onChange={setUsername} />
                    </Grid>
                    <Grid item
                        xs={12}>
                        <FormField label="Email Address"
                            value={email}
                            onChange={setEmail}
                            type="email" />
                    </Grid>
                    <Grid item
                        xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Date of Birth"
                                value={selectedDate}
                                onChange={handleDateChange} />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item
                        xs={12}>
                        <FormField label="Password"
                            value={password}
                            onChange={setPassword}
                            type="password" />
                    </Grid>
                    <Grid item
                        xs={12}>
                        <FormField label="Confirm Password"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            type="password" />
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary"
                    onClick={handleSignup}
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