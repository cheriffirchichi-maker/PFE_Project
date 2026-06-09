import { useState } from "react";
import api from "../api/axios";

const Prediction = () => {
  const [form, setForm] = useState({
    demandeur: "",
    porteur_projet: "",
    intitule_service: "",
    intitule_lp: "",
    objet_instance: "",
    region: "",
    option: "",
    id_service: "",
    id_region: "",
    id_porteur: "",
    id_lp: "",
    id_complexite: "",
    mois_demande: "",
    jour_semaine_demande: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);
    setLoading(true);

    try {
      const payload = {
        ...form,
        id_service: Number(form.id_service),
        id_region: Number(form.id_region),
        id_porteur: Number(form.id_porteur),
        id_lp: Number(form.id_lp),
        id_complexite: Number(form.id_complexite),
        mois_demande: Number(form.mois_demande),
        jour_semaine_demande: Number(form.jour_semaine_demande),
      };

      const res = await api.post("/predictions/delai", payload);
      setPrediction(res.data.prediction);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la prédiction Machine Learning."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page prediction-page">
      <div className="section-title">
        <h1>Prédiction Machine Learning</h1>
        <p>
          Cette page permet de prédire le délai de livraison à partir des
          variables explicatives du modèle.
        </p>
      </div>

      <div className="prediction-layout">
        <form className="prediction-form" onSubmit={handlePredict}>
          <div className="form-grid">
            <div>
              <label>Demandeur</label>
              <input
                name="demandeur"
                value={form.demandeur}
                onChange={handleChange}
                placeholder="Ex : Mohamed"
                required
              />
            </div>

            <div>
              <label>Porteur projet</label>
              <input
                name="porteur_projet"
                value={form.porteur_projet}
                onChange={handleChange}
                placeholder="Ex : Ahmed"
                required
              />
            </div>

            <div>
              <label>Intitulé du service</label>
              <input
                name="intitule_service"
                value={form.intitule_service}
                onChange={handleChange}
                placeholder="Ex : Lancement de production"
                required
              />
            </div>

            <div>
              <label>Intitulé LP</label>
              <input
                name="intitule_lp"
                value={form.intitule_lp}
                onChange={handleChange}
                placeholder="Ex : LP 1"
                required
              />
            </div>

            <div>
              <label>Objet d'instance</label>
              <input
                name="objet_instance"
                value={form.objet_instance}
                onChange={handleChange}
                placeholder="Ex : Instance CPL"
                required
              />
            </div>

            <div>
              <label>Région</label>
              <input
                name="region"
                value={form.region}
                onChange={handleChange}
                placeholder="Ex : Tunis"
                required
              />
            </div>

            <div>
              <label>Option</label>
              <select
                name="option"
                value={form.option}
                onChange={handleChange}
                required
              >
                <option value="">Choisir</option>
                <option value="Standard">Standard</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label>ID service</label>
              <input
                type="number"
                name="id_service"
                value={form.id_service}
                onChange={handleChange}
                placeholder="Ex : 1"
                required
              />
            </div>

            <div>
              <label>ID région</label>
              <input
                type="number"
                name="id_region"
                value={form.id_region}
                onChange={handleChange}
                placeholder="Ex : 1"
                required
              />
            </div>

            <div>
              <label>ID porteur</label>
              <input
                type="number"
                name="id_porteur"
                value={form.id_porteur}
                onChange={handleChange}
                placeholder="Ex : 1"
                required
              />
            </div>

            <div>
              <label>ID LP</label>
              <input
                type="number"
                name="id_lp"
                value={form.id_lp}
                onChange={handleChange}
                placeholder="Ex : 1"
                required
              />
            </div>

            <div>
              <label>ID complexité</label>
              <input
                type="number"
                name="id_complexite"
                value={form.id_complexite}
                onChange={handleChange}
                placeholder="Ex : 2"
                required
              />
            </div>

            <div>
              <label>Mois demande</label>
              <input
                type="number"
                name="mois_demande"
                value={form.mois_demande}
                onChange={handleChange}
                placeholder="Ex : 6"
                min="1"
                max="12"
                required
              />
            </div>

            <div>
              <label>Jour semaine demande</label>
              <input
                type="number"
                name="jour_semaine_demande"
                value={form.jour_semaine_demande}
                onChange={handleChange}
                placeholder="Ex : 1"
                min="0"
                max="6"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Prédiction en cours..." : "Prédire le délai"}
          </button>
        </form>

        <div className="prediction-result-card">
          <span className="result-badge">Résultat ML</span>
          <h2>Délai estimé</h2>

          {error && <div className="error">{error}</div>}

          {prediction !== null ? (
            <>
              <div className="prediction-value">
                {Number(prediction).toFixed(2)}
              </div>
              <p>
                Délai de livraison prédit par le modèle Machine Learning.
              </p>
            </>
          ) : (
            <p>
              Remplis le formulaire puis clique sur “Prédire le délai” pour
              obtenir le résultat.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;