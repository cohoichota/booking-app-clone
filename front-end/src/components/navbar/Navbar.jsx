import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
   const { user, dispatch } = useContext(AuthContext);

   const navigate = useNavigate();

   const handleLogout = (e) => {
      e.preventDefault();
      dispatch({ type: 'LOGOUT' });
      navigate('/');
   };

   return (
      <div className="navbar">
         <div className="navContainer">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
               <span className="logo">booking</span>
            </Link>
            {user ? (
               <div className="navItems">
                  <span>{user.username}</span>
                  <button className="navButton" onClick={handleLogout}>
                     Logout
                  </button>
               </div>
            ) : (
               <div className="navItems">
                  <button className="navButton">Register</button>
                  <button
                     className="navButton"
                     onClick={() => navigate('/login')}
                  >
                     Login
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Navbar;
