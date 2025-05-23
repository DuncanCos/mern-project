import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccueilPages() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bienvenue sur notre plateforme
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Découvrez et gérez vos annonces facilement avec notre application MERN.
      </p>
      <div className="flex flex-row gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
          Se Connecter
        </button>
        <button
          onClick={() => navigate("/subscribe")}
          className="px-6 py-3 text-indigo-600 bg-white rounded-lg border-2   ">
          S'inscrire
        </button>
      </div>
    </div>
  );
}
