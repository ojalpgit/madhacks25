import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Dummy users for demo (in real app, this would be from backend)
  const [dummyUsers] = useState([
    { email: 'demo@bitcoin.com', password: 'demo123', name: 'Demo User' },
    { email: 'test@example.com', password: 'test123', name: 'Test User' },
  ]);

  const login = (email, password) => {
    // Find user in dummy users
    const foundUser = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (email, password, name) => {
    // Check if user already exists
    const existingUser = dummyUsers.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }
    
    // Create new user (just in memory for demo)
    const newUser = { email, password, name };
    dummyUsers.push(newUser);
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

