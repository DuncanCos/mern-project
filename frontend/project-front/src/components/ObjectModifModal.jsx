import { useState, useEffect } from 'react';

export default function ObjectModifModal({ isOpen, onClose, initialData }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setBody(initialData.body);
    }
  }, [initialData]);

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
          <input
            type="text"
            className="input input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Corps</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Annuler</button>
          <button className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
        </div>
      </div>
    </dialog>
  );
}
