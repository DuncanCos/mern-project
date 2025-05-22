import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import LoginPages from './components/LoginPages';
import RegisterPages from './components/RegisterPages';
import ObjectPages from './components/ObjectPages';
import AnnoncesPages from './components/AnnoncesPages';
import BoardPages from './components/BoardPages';


import { useUserContext } from './context/AuthContext';

function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const { token, tokenSetter, tokenDisconnect, verifyToken, isConnected } = useUserContext();

  const disconnect = () => {
    tokenDisconnect()
  }


  return (
    <>
      <nav className="navbar bg-base-100 shadow-md px-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            MonApp
          </Link>
        </div>
        <ul className="menu menu-horizontal gap-4">
          <li>
            <Link to="/">Accueil</Link>
          </li>



          {!verifyToken() ?
            (
              <>
                <li>
                  <Link to="/login">Connexion</Link>
                </li>
                <li>
                  <Link to="/subscribe">Inscription</Link>
                </li>
              </>
            ) : <>
              
                <li> <Link to="/users">Utilisateurs</Link></li>
                <li><Link to="/board">Board</Link></li>
                <li><Link to="/annonces">Annonces</Link></li>
              
              <div onClick={() => disconnect()}>
                disconnect
              </div>
            </>
          }

        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPages />}></Route>
        <Route
          path="/users"
          element={
            <ObjectPages />
          }
        ></Route>
        <Route path="/login" element={<LoginPages />}></Route>
        <Route path="/subscribe" element={<RegisterPages />}></Route>
        <Route path="/annonces" element={<AnnoncesPages />}></Route>
        <Route path="/board" element={<BoardPages />}></Route>
      </Routes>
    </>
  )
}

export default App
