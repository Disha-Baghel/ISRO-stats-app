import React, {useState, useEffect} from "react";
import axios from "axios";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [newFavorite, setNewFavorite] = useState("");

    useEffect(() => {
        fetchFavorites();
    }, []);
    
    const fetchFavorites = async () => {
        try {
            const response = await axios.get("http://localhost:3001");
            setFavorites(response.data);
        } catch (error) {
            console.error("Error fatching favorites:", error.message)
        }
    };

    const addFavorite = async (favorite) => {
        try {
            await axios.post("http://localhost:3001", {name: newFavorite});
            fetchFavorites();
            setNewFavorite("");
        } catch (error) {
            console.error("Error adding favorite:", error.message);
        }
    };

    const deleteFavorite = async (id) => {
        try {
            await axios.delete("http://localhost:3001/${id}");
            fetchFavorites();
        } catch (error) {
            console.error("Error deleting favorite:", error.message);
        }
    };
    
    const updateFavorite = async (id, newName) => {
        try {
            await axios.put("http://localhost:3001/${id}", {name: newName});
            fetchFavorites();
        } catch (error) {
            console.error("Error updating favorite:", error.message);
        }
    };
    
    return (
        <div>
            <h1>ISRO Favorites</h1>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.UUID}>
                        {favorite.Name}{' '}
                        <button onClick={() => updateFavorite(favorite.UUID, prompt("New Name"))}>Update</button>{' '}
                        <button onClick={() => deleteFavorite(favorite.UUID)}>Delete</button>
                        </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="New Favorite"
                    value={newFavorite}
                    onChange={(event) => setNewFavorite(event.target.value)}
                />
                <button onClick={addFavorite}>Add</button>
            </div>
        </div>
    );
};

export default Favorites;