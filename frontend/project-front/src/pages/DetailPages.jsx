import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/AuthContext";

export default function DetailPages() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token, tokenSetter, tokenDisconnect, verifyToken, isConnected } =
    useUserContext();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/posts/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAd(response.data);
      } catch (err) {
        setError("Annonce introuvable ou erreur serveur.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!ad) return null;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full">
        {/* Image de l’annonce */}
        <img
          src={`https://picsum.photos/seed/${ad._id}/400/250`}
          alt={ad.title}
          className="w-full h-64 object-cover rounded-hmd mb-6"
        />

        {/* Titre */}
        <h1 className="text-3xl font-bold text-sky-800 mb-2">{ad.name}</h1>

        {/* Date de publication */}
        <p className="text-gray-600 mb-4">
          Publié le :{" "}
          {new Date(ad.date_ajout).toLocaleString("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </p>

        {/* Description */}
        <p className="text-gray-700 mb-4">{ad.description}</p>

        {/* Auteur */}
        {ad.author?.username && (
          <p className="text-gray-600 italic mb-4">
            Vendeur : {ad.author.username}
          </p>
        )}

        {/* Localisation & Catégorie */}
        <div className="text-sm text-gray-500 mb-2">
          Lieu : {ad.location} — Catégorie : {ad.category}
        </div>

        {/* Prix */}
        <div className="text-lg font-semibold text-sky-700">{ad.price} €</div>
      </div>
    </div>
  );
}
