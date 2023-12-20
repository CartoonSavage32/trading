import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';


const RedirectToLoginOrDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/'){
      const sessionId = localStorage.getItem('session_id');
      if (sessionId) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [navigate,location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <Navbar />
      <RedirectToLoginOrDashboard />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;