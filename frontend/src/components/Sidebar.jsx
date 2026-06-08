import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart3, Building2, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">BI</div>
        <div>
          <h2>PFE BI</h2>
          <span>Decision Platform</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <Link className={isActive("/") ? "active" : ""} to="/">
          <Home size={20} />
          Accueil
        </Link>

        <Link className={isActive("/powerbi") ? "active" : ""} to="/powerbi">
          <BarChart3 size={20} />
          Power BI
        </Link>

        <Link className={isActive("/company") ? "active" : ""} to="/company">
          <Building2 size={20} />
          Société
        </Link>

        {user?.role === "admin" && (
          <Link className={isActive("/users") ? "active" : ""} to="/users">
            <Users size={20} />
            Utilisateurs
          </Link>
        )}

        <Link className={isActive("/profile") ? "active" : ""} to="/profile">
          <UserCircle size={20} />
          Profil
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;