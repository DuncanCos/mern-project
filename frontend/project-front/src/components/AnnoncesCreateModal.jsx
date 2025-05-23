import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/AuthContext';
export default function AnnoncesCreateModal({ isOpen, onClose, refresher }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const { token, tokenSetter, tokenDisconnect, verifyToken, isConnected } = useUserContext();

 

    const handleSave = () => {
        // Appel à l'API à ajouter ici
        console.log(token)
        axios.post("http://127.0.0.1:4000/api/posts/",
            {

                category: category,
                description: description,
                name: title,
                price: price
            }, { headers: { Authorization: `Bearer ${token}` }, }).then(resp => {
                refresher()
                console.log(resp)
            }).catch(err => {
                console.log(err)
            })
       
        onClose();
    };

    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <h3 className="font-bold text-2xl mb-6">Modifier l'annonce</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
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

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Catégorie</span>
                        </label>
                        <select
                            className="select select-bordered"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option disabled value="">Choisissez une catégorie</option>
                            <option value="Vehicules">Véhicules</option>
                            <option value="Maison">Immobilier</option>
                            <option value="Electromenager">Électroménager</option>
                            <option value="Multimedia">Multimédia</option>
                            <option value="Sport">Sport & Loisirs</option>
                        </select>
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>



                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Prix (€)</span>
                        </label>
                        <input type="number" className="input " onChange={(e) => setPrice(e.target.value)} value={price} />
                    </div>


                </div>

                <div className="modal-action mt-6">
                    <button className="btn btn-outline" onClick={onClose}>Annuler</button>
                    <button className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
                </div>
            </div>
        </dialog>
    );
}
