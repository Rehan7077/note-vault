import { useContext, useState } from "react";
import "./Navbar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { handleLogout } from "../../Firebase/userService";

export const Navbar = () => {
  const { user, loading, setNoteModal } = useContext(UserContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);


  if (loading)
    return (
      <nav className="navbar">
        <h4 className="logo">NV</h4>
      </nav>
    );

  const handleModal = () => setNoteModal(true);

  const handleProfileClick = () => setShowMenu((prev) => !prev);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar">
        <h4 className="logo">NV</h4>
        {user ? (
          <div className="nav-links">
            <div className="nav-btn">
              <NavLink to="/dashboard" className="nav-link">
                DashBoard
              </NavLink>
              <NavLink to="/allnotes" className="nav-link">
                All Notes
              </NavLink>
              <a onClick={handleModal} className="new-note-btn">
                New Note
              </a>
            </div>

            <div className="profile">
              <span className="user-name">Hello, {user.name.split(" ")[0]}</span>
              <img
                src={user.profilePic}
                alt="Profile"
                style={{ width: "30px", borderRadius: "50%", cursor: "pointer" }}
                onClick={handleProfileClick}
              />
              <div className={`profile-menu ${showMenu ? "show" : "hide"}`}>
                <div className="poplinks">
                  <button className="links" onClick={() => navigate("/profile")}>
                    Profile Settings
                  </button>
                  <NavLink to="/dashboard" className="links">DashBoard</NavLink>
                  <NavLink to="/allnotes" className="links">All Notes</NavLink>
                  <NavLink onClick={handleModal} className="links">New Note</NavLink>
                  <button className="links" onClick={handleLogoutClick}>Logout</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="login-signup">
            <Link to="/login">Get Started</Link>
          </div>
        )}
      </nav>
    </div>
  );
};
