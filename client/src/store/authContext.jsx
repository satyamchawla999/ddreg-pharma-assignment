import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const TOKEN_KEY = 'token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 new
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      setUser({ token });
    }
    setLoading(false); // 👈 after checking localStorage
  }, []);

  const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    setUser({ token });
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
