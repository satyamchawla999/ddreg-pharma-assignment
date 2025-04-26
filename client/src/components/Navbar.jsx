import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../store/authContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-white font-semibold text-lg hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/profile" className="text-white hover:text-gray-300">
          Profile
        </Link>
        <Link to="/analytics" className="text-white hover:text-gray-300">
          Analytics
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
