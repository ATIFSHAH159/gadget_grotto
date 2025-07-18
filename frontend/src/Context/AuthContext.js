import { createContext, useState, useEffect } from 'react';
import { register, login, logout, getProfile } from '../Services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  // Register user
  const registerUser = async (userData) => {
    try {
      const response = await register(userData);
      // Don't set user or store in localStorage after registration
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Login user
  const loginUser = async (userData) => {
    try {
      const response = await login(userData);
      setUser(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Logout user
  const logoutUser = () => {
    logout();
    setUser(null);
  };

  // Get user profile
  const getUserProfile = async () => {
    try {
      const response = await getProfile(user.token);
      setUser(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register: registerUser,
        login: loginUser,
        logout: logoutUser,
        getProfile: getUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 