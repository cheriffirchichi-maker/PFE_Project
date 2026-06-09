import { useEffect, useState } from "react";
import api from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors du chargement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showMessage = (message) => {
    setSuccess(message);
    setError("");

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const approveUser = async (id) => {
    try {
      await api.put(`/users/${id}/approve`);
      showMessage("Utilisateur approuvé avec succès.");
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l’approbation.");
    }
  };

  const rejectUser = async (id) => {
    const confirmReject = window.confirm(
      "Voulez-vous vraiment refuser cette inscription ?"
    );

    if (!confirmReject) return;

    try {
      await api.put(`/users/${id}/reject`);
      showMessage("Utilisateur refusé avec succès.");
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors du refus.");
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await api.put(`/users/${id}/status`, { status });
      showMessage(`Statut changé en ${status}.`);
      fetchUsers();
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors du changement de statut."
      );
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);
      showMessage("Utilisateur supprimé avec succès.");
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la suppression.");
    }
  };

  const getStatusClass = (status) => {
    if (status === "active") return "status active";
    if (status === "pending") return "status pending";
    if (status === "inactive") return "status inactive";
    if (status === "rejected") return "status rejected";
    return "status";
  };

  const getStatusLabel = (status) => {
    if (status === "active") return "Actif";
    if (status === "pending") return "En attente";
    if (status === "inactive") return "Désactivé";
    if (status === "rejected") return "Refusé";
    return status;
  };

  return (
    <div className="page users-page">
      <div className="section-title">
        <h1>Gestion des utilisateurs</h1>
        <p>
          Cette interface permet à l’administrateur de gérer les comptes,
          approuver les inscriptions et sécuriser l’accès à la plateforme.
        </p>
      </div>

      <div className="users-summary">
        <div className="summary-card">
          <h3>{users.length}</h3>
          <p>Total utilisateurs</p>
        </div>

        <div className="summary-card pending-card">
          <h3>{users.filter((u) => u.status === "pending").length}</h3>
          <p>En attente</p>
        </div>

        <div className="summary-card active-card">
          <h3>{users.filter((u) => u.status === "active").length}</h3>
          <p>Actifs</p>
        </div>

        <div className="summary-card rejected-card">
          <h3>{users.filter((u) => u.status === "rejected").length}</h3>
          <p>Refusés</p>
        </div>
      </div>

      {error && <div className="error users-alert">{error}</div>}
      {success && <div className="success users-alert">{success}</div>}

      <div className="table-card users-table-card">
        {loading ? (
          <p>Chargement des utilisateurs...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Email vérifié</th>
                <th>Dernière connexion</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {user.first_name?.charAt(0)}
                        {user.last_name?.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {user.first_name} {user.last_name}
                        </strong>
                        <span>{user.role}</span>
                      </div>
                    </div>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span className="role-pill">{user.role}</span>
                  </td>

                  <td>
                    <span className={getStatusClass(user.status)}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>

                  <td>
                    {user.email_verified ? (
                      <span className="verified yes">Oui</span>
                    ) : (
                      <span className="verified no">Non</span>
                    )}
                  </td>

                  <td>
                    {user.last_login
                      ? new Date(user.last_login).toLocaleString("fr-FR")
                      : "Jamais"}
                  </td>

                  <td>
                    <div className="actions-cell">
                      {user.status === "pending" && (
                        <>
                          <button
                            className="action-btn approve"
                            onClick={() => approveUser(user._id)}
                          >
                            Approuver
                          </button>

                          <button
                            className="action-btn reject"
                            onClick={() => rejectUser(user._id)}
                          >
                            Refuser
                          </button>
                        </>
                      )}

                      {user.status === "active" && user.role !== "admin" && (
                        <button
                          className="action-btn deactivate"
                          onClick={() => changeStatus(user._id, "inactive")}
                        >
                          Désactiver
                        </button>
                      )}

                      {user.status === "inactive" && (
                        <button
                          className="action-btn activate"
                          onClick={() => changeStatus(user._id, "active")}
                        >
                          Activer
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          className="action-btn delete"
                          onClick={() => deleteUser(user._id)}
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;