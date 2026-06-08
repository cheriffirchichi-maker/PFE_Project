import { Link, useLocation, useNavigate } from "react-router-dom";
import { BarChart3, Building2, Home, LogOut, UserCircle, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="top-header">
      <div className="top-bar">
        <div className="brand">
          <div className="brand-logo">M</div>
          <div>
            <h2>BI Platform</h2>
            <span>Business Intelligence Portal</span>
          </div>
        </div>

        <div className="top-user">
          <div className="user-mini">
            <strong>{user?.first_name} {user?.last_name}</strong>
            <span>{user?.role}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={17} />
            Déconnexion
          </button>
        </div>
      </div>

      <nav className="nav-links">
        <Link className={isActive("/") ? "active" : ""} to="/">
          <Home size={18} />
          Accueil
        </Link>

        <Link className={isActive("/company") ? "active" : ""} to="/company">
          <Building2 size={18} />
          Société
        </Link>

        <Link className={isActive("/powerbi") ? "active" : ""} to="/powerbi">
          <BarChart3 size={18} />
          Power BI
        </Link>

        {user?.role === "admin" && (
          <Link className={isActive("/users") ? "active" : ""} to="/users">
            <Users size={18} />
            Utilisateurs
          </Link>
        )}

        <Link className={isActive("/profile") ? "active" : ""} to="/profile">
          <UserCircle size={18} />
          Profil
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;