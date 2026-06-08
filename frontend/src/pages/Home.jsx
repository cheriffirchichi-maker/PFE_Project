import { BarChart3, Building2, ShieldCheck, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div>
          <span className="hero-badge">Business Intelligence Portal</span>
          <h1>Bienvenue, {user?.first_name}</h1>
          <p>
            Cette plateforme décisionnelle permet de centraliser les données,
            consulter les tableaux de bord Power BI, suivre les indicateurs clés
            et faciliter la prise de décision au sein de l’entreprise.
          </p>
        </div>

        <div className="hero-actions">
          <a href="/powerbi">Accéder aux dashboards</a>
          <a href="/profile" className="secondary-link">Mon profil</a>
        </div>
      </section>

      <section className="company-overview">
        <div className="section-title">
          <h2>Présentation de la société</h2>
          <p>Informations générales et contexte du projet BI.</p>
        </div>

        <div className="company-grid">
          <div className="company-main-card">
            <h3>Mantu / Amaris Consulting</h3>
            <p>
              L’entreprise évolue dans le domaine du conseil, de la technologie
              et de la transformation digitale. Le projet BI vise à fournir une
              vision claire des performances à travers des indicateurs, des
              analyses et des tableaux de bord interactifs.
            </p>
          </div>

          <div className="info-card">
            <Building2 size={28} />
            <h4>Secteur</h4>
            <p>Conseil, technologie et data</p>
          </div>

          <div className="info-card">
            <BarChart3 size={28} />
            <h4>Objectif BI</h4>
            <p>Analyse et suivi des KPI</p>
          </div>

          <div className="info-card">
            <Users size={28} />
            <h4>Utilisateurs</h4>
            <p>Admin, responsable, employé</p>
          </div>

          <div className="info-card">
            <ShieldCheck size={28} />
            <h4>Sécurité</h4>
            <p>JWT, rôles, OTP et Gmail</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;