from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import traceback

app = FastAPI(title="API ML - Prédiction délai de livraison")

# model_delai.pkl contient déjà le modèle + preprocessing
model = joblib.load("model_delai.pkl")


class PredictionInput(BaseModel):
    demandeur: str
    porteur_projet: str
    intitule_service: str
    intitule_lp: str
    objet_instance: str
    region: str
    option: str

    id_service: int
    id_region: int
    id_porteur: int
    id_lp: int
    id_complexite: int
    mois_demande: int
    jour_semaine_demande: int


@app.get("/")
def home():
    return {
        "message": "API Machine Learning fonctionne correctement"
    }


@app.post("/predict")
def predict(data: PredictionInput):
    try:
        input_df = pd.DataFrame([{
            "Demandeur": data.demandeur,
            "Porteur_Projet": data.porteur_projet,
            "Intitulé du service": data.intitule_service,
            "Intitulé LP": data.intitule_lp,
            "Objet d'instance": data.objet_instance,
            "Région": data.region,
            "Option": data.option,
            "id_service": data.id_service,
            "id_region": data.id_region,
            "id_porteur": data.id_porteur,
            "id_lp": data.id_lp,
            "id_complexite": data.id_complexite,
            "mois_demande": data.mois_demande,
            "jour_semaine_demande": data.jour_semaine_demande
        }])

        print("Données reçues :")
        print(input_df)

        # Important : pas de preprocessor.transform ici
        prediction = model.predict(input_df)[0]

        return {
            "prediction": float(prediction),
            "message": "Prédiction effectuée avec succès"
        }

    except Exception as e:
        print("ERREUR PREDICTION :")
        print(traceback.format_exc())

        return {
            "message": "Erreur lors de la prédiction",
            "error": str(e)
        }