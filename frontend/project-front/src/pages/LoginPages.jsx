import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/AuthContext";

export default function LoginPages() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [valid, setValid] = useState(null);
  const { token, tokenSetter, tokenDisconnect, verifyToken, isConnected } =
    useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    axios
      .post("http://127.0.0.1:4000/api/auth/login", {
        mail: mail,
        password: password,
      })
      .then((resp) => {
        tokenSetter(resp.data.token);
        navigate("/annonces");
      })
      .catch((erro) => {
        setError(erro.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Connexion</h1>

        {error && (
          <div className="alert alert-error mb-4 py-2 px-3">
            <span>{error}</span>
          </div>
        )}
        {valid && (
          <div className="alert alert-success text-white mb-4 py-2 px-3">
            <span>Vous êtes bien connecté !</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Entrez votre email"
              className="input input-bordered w-full"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="Entreez votre mot de passe"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Pas encore de compte ?{" "}
          <a href="/subscribe" className="link link-primary">
            Inscrivez‑vous
          </a>
        </p>
      </div>
    </div>
  );
}
