import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login with the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.isAdmin) {
    // If user is not admin, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 