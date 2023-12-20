import React from 'react';
import { TextField } from '@mui/material';

interface FormFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    error?: boolean;
    helperText?: string;
    style?: React.CSSProperties;
    InputProps?: {
        endAdornment?: React.ReactNode;
    };
    inputProps?: {
        maxLength?: number;
    };

}

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = 'text', error, helperText, style, InputProps, inputProps }) => {
    return (
        // <Grid item xs={12} sm={12}>
            <TextField
                label={label}
                fullWidth
                variant="outlined"
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                error={error}
                helperText={helperText}
                style={style}
                InputProps={InputProps}
                inputProps={inputProps}

            />
        // </Grid>
    );
};

export default FormField;