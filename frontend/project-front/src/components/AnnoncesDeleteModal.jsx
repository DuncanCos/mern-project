import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/AuthContext';

export default function AnnoncesDeleteModal({ isOpen, onClose, id , refresher }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { token, tokenSetter, tokenDisconnect, verifyToken, isConnected } = useUserContext();


  const handleSave = () => {
    //faire le call axios
    axios.delete(`http://127.0.0.1:4000/api/posts/${id}`,{headers: { Authorization: `Bearer ${token}` },}).then(resp => {
      console.log(resp)
  }).catch(err => {
      console.log(err)
  })
  refresher()
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Modifier le modèle</h3>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Titre</span>
          </label>

        </div>

        <div>etes vous sur de vouloir supprimer l'id {id}</div>
        <div className='modal-action'>


          <div>
            <button className='btn btn-primary' onClick={handleSave}>Supprimer</button>
          </div>
          <div>
            <button className='btn ' onClick={onClose}>annuler</button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
