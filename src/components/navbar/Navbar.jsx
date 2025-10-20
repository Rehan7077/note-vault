import { useContext, useState } from "react";
import "./Navbar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { handleLogout } from "../../Firebase/userService";

export const Navbar = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // popup toggle

  if (loading)
    return (
      <nav className="navbar">
        <h4 className="logo">NV</h4>

      </nav>
    );

  const handleProfileClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h4 className="logo">NV</h4>
      {user ? (
        <div className="nav-links">
          <div className="nav-btn">
             <NavLink to="/dashboard" className="link">
            DashBoard
          </NavLink>
          <NavLink to="/allnotes" className="link">
            All Notes
          </NavLink>
          <NavLink to="/newnote" className="link">
            New Note
          </NavLink>
          </div>
         

          <div className="profile">
            <span className="user-name">Hello, {user.name.split(" ")[0]}</span>
            <img
              src={user.profilePic}
              alt="Profile"
              style={{ width: "30px", borderRadius: "50%", cursor: "pointer" }}
              onClick={handleProfileClick}
            />

            {/* Popup Menu */}
            {showMenu && (
              <div className="profile-menu">
                <div className="poplinks">
                   <button className="links" onClick={() => navigate("/profile")}>
                  Profile Settings
                </button>
                  <NavLink to="/dashboard" className="links">
                    DashBoard
                  </NavLink>
                  <NavLink to="/allnotes" className="links">
                    All Notes
                  </NavLink>
                  <NavLink to="/newnote" className="links">
                    New Note
                  </NavLink>
                   <button className="links" onClick={handleLogoutClick}>Logout</button>
                </div>
              
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="login-signup">
          <Link to="/login">Get Started</Link>
        </div>
      )}
    </nav>
  );
};
