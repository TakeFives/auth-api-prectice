import  { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Header() {

    const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
        <nav className="header__nav nav">
            <h1 className="nav__logo">Recipes App</h1>

            <ul className="nav__links">
          {!user ? ( 
            <>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </>
          ) : ( 
            <>
              <li>Welcome, {user.username}!</li>
              <li><button onClick={logout} className="nav__logout">Logout</button></li>
            </>
          )}
        </ul>
        </nav>
    </header>
  );
}
export default Header;