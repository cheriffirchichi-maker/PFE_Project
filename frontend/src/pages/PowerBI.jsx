const PowerBI = () => {
  const powerBiUrl =
    "https://app.powerbi.com/reportEmbed?reportId=13c86d72-ceae-45be-9dec-ab7b75b175c8&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730";

  return (
    <div className="page">
      <div className="section-title">
        <h1>Tableaux de bord Power BI</h1>
        <p>
          Cette page permet de consulter les tableaux de bord décisionnels
          intégrés depuis Power BI.
        </p>
      </div>

      <div className="powerbi-container">
        <div className="powerbi-header">
          <div>
            <h2>PFE Dashboard</h2>
            <p>Visualisation interactive des indicateurs clés.</p>
          </div>

          <span className="powerbi-badge">Power BI</span>
        </div>

        <iframe
          title="PFE Dashboard"
          src={powerBiUrl}
          className="powerbi-frame"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default PowerBI;