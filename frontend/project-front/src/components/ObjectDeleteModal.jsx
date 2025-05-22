import { useState, useEffect } from 'react';

export default function ObjectDeleteModal({ isOpen, onClose, id }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {

  }, []);

  const handleSave = () => {
    //faire le call axios

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
