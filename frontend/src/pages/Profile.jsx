import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>Mon profil</h1>
      <p>Informations du compte connecté.</p>

      <div className="profile-card">
        <div className="profile-avatar">
          {user?.first_name?.charAt(0)}
          {user?.last_name?.charAt(0)}
        </div>

        <div className="profile-info">
          <h2>
            {user?.first_name} {user?.last_name}
          </h2>
          <p>{user?.email}</p>
          <span className="role-badge">{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;