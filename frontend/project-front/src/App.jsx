import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import LoginPages from "./pages/LoginPages";
import RegisterPages from "./pages/RegisterPages";
import ObjectPages from "./pages/ObjectPages";
import AnnoncesPages from "./pages/AnnoncesPages";
import BoardPages from "./pages/BoardPages";

import { useUserContext } from "./context/AuthContext";
import DetailPages from "./pages/DetailPages";
import AccueilPages from "./pages/AccueilPages";

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { token, tokenSetter, tokenDisconnect, verifyToken, isConnected } =
    useUserContext();

  const disconnect = () => {
    tokenDisconnect();
  };

  return (
    <>
      <nav className="navbar bg-base-100 shadow-md px-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            MERN PROJECT
          </Link>
        </div>

        <ul className="menu menu-horizontal gap-4">
          <li>
            <Link to="/">Accueil</Link>
          </li>

          {!verifyToken() ? (
            <>
              <li>
                <Link to="/login">Connexion</Link>
              </li>
              <li>
                <Link to="/subscribe">Inscription</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/board">Board</Link>
              </li>
              <li>
                <Link to="/annonces">Annonces</Link>
              </li>
              <li>
                <button
                  onClick={tokenDisconnect}
                  className="btn btn-sm btn-error text-white">
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<AccueilPages />}></Route>
        <Route path="/users" element={<ObjectPages />}></Route>
        <Route path="/login" element={<LoginPages />}></Route>
        <Route path="/detail/:id" element={<DetailPages />}></Route>
        <Route path="/subscribe" element={<RegisterPages />}></Route>
        <Route path="/annonces" element={<AnnoncesPages />}></Route>
        <Route path="/board" element={<BoardPages />}></Route>
      </Routes>
    </>
  );
}

export default App;
