const axios = require("axios");

const predictDelai = async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/predict",
      req.body
    );

    res.json({
      message: "Prédiction effectuée avec succès.",
      prediction: response.data.prediction,
      result: response.data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la prédiction.",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  predictDelai,
};