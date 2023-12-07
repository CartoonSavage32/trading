import React from 'react';
import { TextField, Grid } from '@mui/material';

interface FormFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = 'text' }) => {
    return (
        <Grid item xs={12} sm={12}>
            <TextField
                label={label}
                fullWidth
                variant="outlined"
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </Grid>
    );
};

export default FormField;