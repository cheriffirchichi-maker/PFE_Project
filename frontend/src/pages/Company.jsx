const Company = () => {
  return (
    <div className="page">
      <div className="section-title">
        <h1>Informations sur la société</h1>
        <p>
          Cette page présente le contexte de l’entreprise et les objectifs de la
          plateforme décisionnelle.
        </p>
      </div>

      <div className="company-details">
        <div>
          <h2>Mantu / Amaris Consulting</h2>
          <p>
            Mantu est un groupe international de conseil regroupant plusieurs
            marques spécialisées dans la technologie, le digital, la stratégie
            et la transformation des organisations.
          </p>
          <p>
            Amaris Consulting accompagne les entreprises dans leurs projets
            technologiques et data. Dans ce contexte, la plateforme BI permet de
            centraliser les données et de rendre les indicateurs plus
            accessibles aux responsables.
          </p>
        </div>

        <div className="details-box">
          <h3>Objectifs du projet</h3>
          <ul>
            <li>Centraliser l’accès aux tableaux de bord Power BI</li>
            <li>Sécuriser l’accès selon les rôles</li>
            <li>Gérer les utilisateurs</li>
            <li>Envoyer des notifications par email</li>
            <li>Vérifier les comptes par code OTP</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Company;