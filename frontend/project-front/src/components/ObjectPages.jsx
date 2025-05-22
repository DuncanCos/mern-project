import React from 'react'
import { useUserContext } from '../context/AuthContext';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import ObjectModifModal from './ObjectModifModal';
import ObjectDeleteModal from './ObjectDeleteModal';

export default function ObjectPages() {
  const { token, tokenSetter, tokenDisconnect, verifyToken, isConnected } = useUserContext();

  const  [refresh, setRefresh] = useState(false)
  const [posts, setPosts] = useState([{"_id":"1","title":"oui","body":"nono"}])

  const [modalOpen, setModalOpen] = useState(false);
  const [model, setModel] = useState({ title: 'Titre initial', body: 'Contenu initial' });


  const [modalOpenDelete, setModalOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("!@#");


  const getallusers =()=> {
    console.log(token)
    axios.get("http://127.0.0.1:4000/api/posts/", {headers: {Authorization : `Bearer ${token}`}} ).then(resp => {
      console.log(resp.data)
      setPosts(resp.data)
    })
  }
  useEffect(()=>{
    getallusers()
  },[refresh])

  if (!verifyToken()) return <div> nope </div>;
  return (
    <div>
   
      <div>ObjectPages</div>
    
      <table className="table table-zebra w-full">
  <thead>
    <tr>
      <th>ID</th>
      <th>Titre</th>
      <th>Contenu</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {posts.map((post) => (
      <tr key={post._id}>
        <td>{post._id}</td>
        <td>{post.title}</td>
        <td>{post.body}</td>
        <td className="flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {setModel(post) ;setModalOpen(!modalOpen)}}
          >
            Modifier
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => {setIdDelete(post._id); setModalOpenDelete(!modalOpenDelete)}}
          >
            Supprimer
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    {/* <ObjectModifModal isOpen={modalOpen} onClose={()=> setModalOpen(!modalOpen)} initialData={model}/>
    
    <ObjectDeleteModal isOpen={modalOpenDelete} onClose={()=> setModalOpenDelete(!modalOpenDelete)} id={idDelete} /> */}
    </div>
  )
}
