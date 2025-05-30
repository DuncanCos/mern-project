import React from "react";
import { useUserContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AnnoncesModifModal from "../components/AnnoncesModifModal";
import AnnoncesDeleteModal from "../components/AnnoncesDeleteModal";
import AnnoncesCreateModal from "../components/AnnoncesCreateModal";
import DetailPages from "./DetailPages";

export default function BoardPages() {
  const {
    token,
    tokenSetter,
    tokenDisconnect,
    verifyToken,
    userId,
    username,
    isConnected,
  } = useUserContext();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState([
    {
      _id: "000000",
      name: "Le vide",
      category: "Sport",
      owner: {
        _id: "0000001",
        username: "void",
      },
      description: "le vide absolue",
      price: 1,
      date_ajout: "2025-05-22T07:56:44.796Z",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [model, setModel] = useState({
    _id: "000000",
    name: "Le vide",
    category: "Sport",
    owner: {
      _id: "0000001",
      username: "void",
    },
    description: "le vide absolue",
    price: 1,
    date_ajout: "2025-05-22T07:56:44.796Z",
  });

  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("!@#");

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("none");
  const [postDisplayed, setPostDisplayed] = useState([
    {
      _id: "000000",
      name: "Le vide",
      category: "Sport",
      owner: {
        _id: "0000001",
        username: "void",
      },
      description: "le vide absolue",
      price: 1,
      date_ajout: "2025-05-22T07:56:44.796Z",
    },
  ]);

  const filtering = () => {
    console.log(filter);

    console.log(posts);
    if (filter != "none") {
      setPostDisplayed(posts.filter((post) => post.category === filter));
    } else {
      setPostDisplayed(posts);
    }
  };

  const getallannonces = async () => {
    axios
      .get("http://127.0.0.1:4000/api/posts/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setPosts(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    console.log("refreshing");
    getallannonces();
  }, [refresh]);

  useEffect(() => {
    filtering();
  }, [posts, filter, refresh]);

  if (!verifyToken()) return <div> nope </div>;
  if (loading) return <p>Chargement...</p>;
  return (
    <>
      <button
        className="btn btn-primary w-fit m-4"
        onClick={() => {
          setModalCreateOpen(!modalCreateOpen);
        }}>
        Ajouter une annonce
      </button>

      <div className="flex items-center gap-4">
        <label htmlFor="categorie-filter" className="font-semibold">
          Filtrer par catégorie :
        </label>
        <select
          id="categorie-filter"
          className="select select-bordered"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            filtering();
          }}>
          <option disabled value="">
            Choisissez une catégorie
          </option>
          <option value="Vehicules">Véhicules</option>
          <option value="Maison">Immobilier</option>
          <option value="Electromenager">Électroménager</option>
          <option value="Multimedia">Multimédia</option>
          <option value="Sport">Sport & Loisirs</option>
          <option value="none">Autres</option>
        </select>
      </div>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Categorie</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postDisplayed.map((post) => (
            <tr key={post._id}>
              <td>{post._id}</td>
              <td>{post.name}</td>
              <td>{post.owner.username}</td>
              <td>{post.category}</td>
              <td>{post.price} €</td>
              <td className="flex gap-2">
                <>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                      setModel(post);
                      setModalOpen(!modalOpen);
                    }}>
                    Modifier
                  </button>
                  <button
                    className="btn btn-sm text-white btn-error"
                    onClick={() => {
                      setIdDelete(post._id);
                      setModalOpenDelete(!modalOpenDelete);
                    }}>
                    Supprimer
                  </button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AnnoncesModifModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
        initialData={model}
        refresher={() => setRefresh(!refresh)}
      />
      <AnnoncesDeleteModal
        isOpen={modalOpenDelete}
        onClose={() => setModalOpenDelete(!modalOpenDelete)}
        id={idDelete}
        refresher={() => setRefresh(!refresh)}
      />
      <AnnoncesCreateModal
        isOpen={modalCreateOpen}
        onClose={() => setModalCreateOpen(!modalCreateOpen)}
        refresher={() => setRefresh(!refresh)}
      />
    </>
  );
}
