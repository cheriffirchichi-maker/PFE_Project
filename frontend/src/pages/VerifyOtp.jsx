import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import api from "../api/axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [otpCode, setOtpCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp_code: otpCode,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de vérification.");
    }
  };

  const resendOtp = async () => {
    setError("");
    setMessage("");

    try {
      const res = await api.post("/auth/resend-otp", { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'envoi.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Vérification Email</h1>
        <p>Entrez le code OTP reçu par email</p>

        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}

        <form onSubmit={verifyOtp}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Code OTP</label>
          <input
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            placeholder="Code à 6 chiffres"
          />

          <button type="submit">Vérifier</button>
        </form>

        <button className="secondary-btn" onClick={resendOtp}>
          Renvoyer le code
        </button>

        <p className="auth-link">
          <Link to="/login">Retour à la connexion</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;