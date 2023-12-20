import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSIgonOut = () => {
        localStorage.removeItem('session_id');
        localStorage.removeItem('isAuthorized');
        navigate('/login');
    };

    const authPaths = ['/login', '/signup']

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    {/* Add your logo or branding here */}
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Stock Trading
                    </Link>
                </Typography>
                {authPaths.includes(location.pathname) && (
                    <>
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
                    </>
                )}

                {!authPaths.includes(location.pathname) && (
                    <Button onClick={handleSIgonOut} color="inherit">
                        Sign Out
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
