import { NavLink } from "react-router-dom";
import "../navbar.css";

export default function NavBar({ user }) {
  // Set nav style based on login status
  const navStyle = !user ? { display: 'flex', justifyContent: 'center' } : {};
  
  return (
    <>
      <nav style={navStyle}>
        <NavLink to="/login">Login</NavLink>
        {user && (
          <>
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/create">Create</NavLink>
          </>
        )}
      </nav>
      <div className="navbar-spacer" />
    </>
  );
}