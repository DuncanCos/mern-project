import React from "react";
import { useUserContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function AnnoncesPages() {
  const { token, tokenSetter, tokenDisconnect, verifyToken, isConnected } =
    useUserContext();

  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState([
    {
      _id: "000000",
      title: "Le vide",
      categorie: "Sport",
      author: {
        _id: "0000001",
        username: "void",
      },
      description: "le vide absolue",
      prix: 1,
      date_ajout: "2025-05-22T07:56:44.796Z",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [model, setModel] = useState({
    _id: "000000",
    title: "Le vide",
    categorie: "Sport",
    author: {
      _id: "0000001",
      username: "void",
    },
    description: "le vide absolue",
    prix: 1,
    date_ajout: "2025-05-22T07:56:44.796Z",
  });

  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("!@#");

  const [filter, setFilter] = useState("none");
  const [postDisplayed, setPostDisplayed] = useState([
    {
      _id: "000000",
      title: "Le vide",
      categorie: "Sport",
      author: {
        _id: "0000001",
        username: "void",
      },
      description: "le vide absolue",
      prix: 1,
      date_ajout: "2025-05-22T07:56:44.796Z",
    },
  ]);

  const filtering = () => {


    setPostDisplayed(posts.filter((post) =>
      [post.title, post.categorie, post.author.username]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    ))

    if (filter != "none") {
      console.log(filter);
      setPostDisplayed(posts.filter((post) => post.categorie === filter));
    } else {
      setPostDisplayed(posts);
    }



  };

  const getallannonces = () => {
    console.log(token);
    axios
      .get("http://127.0.0.1:4000/api/annonces/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        console.log(resp.data);
        setPosts(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log("refreshing");
    getallannonces();
    filtering();
  }, [refresh, filter]);

  useEffect(() => {
    filtering();
  }, [posts, filter, refresh, search]);



  if (!verifyToken()) return <div> nope </div>;

  return (
    <>

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

          }}>
          <option disabled value="">
            Choisissez une catégorie
          </option>
          <option value="Vehicules">Véhicules</option>
          <option value="Maison">Immobilier</option>
          <option value="Electromenager">Électroménager</option>
          <option value="Multimedia">Multimédia</option>
          <option value="Sport">Sport & Loisirs</option>
          <option value="none">rien</option>
        </select>
      </div>


      <input
        type="text"
        placeholder="Rechercher un titre, une catégorie ou un auteur..."
        className="input input-bordered w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {postDisplayed.map((post) => (
          <div
            key={post._id}
            className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <figure>
              <img
                src={`https://picsum.photos/seed/${post._id}/400/250`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.categorie}</p>
              <p className="text-base line-clamp-2">{post.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-primary">
                  {post.prix} €
                </span>
                <button className="btn btn-primary btn-sm">Voir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
