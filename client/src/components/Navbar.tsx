import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    {/* Add your logo or branding here */}
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Stock Trading
                </Typography>
                <Button color="inherit">
                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Log In
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Sign Up
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
