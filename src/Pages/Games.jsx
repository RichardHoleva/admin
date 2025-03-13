import React, { useState, useEffect } from 'react';
import '../games.css';
import { getFirestore, collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

const Games = () => {
  const db = getFirestore();
  const [games, setGames] = useState([]);
  const [editGame, setEditGame] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    players: '',
    imageUrl: '',
    difficulty: '',
    category: '',
    age: '',
    time: ''
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'games'));
        const gamesData = querySnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, [db]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'games', id));
      const updatedGames = games.filter(game => game.id !== id);
      setGames(updatedGames);
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleEdit = (game) => {
    setEditGame(game);
    setFormData({
      title: game.title,
      description: game.description,
      players: game.players,
      imageUrl: game.imageUrl,
      difficulty: game.difficulty,
      category: game.category,
      age: game.age,
      time: game.time
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedGame = {
      ...formData,
      imageUrl: formData.imageUrl || 'https://placehold.co/600x400?text=No+Image'
    };
    try {
      await updateDoc(doc(db, 'games', editGame.id), updatedGame);
      const updatedGames = games.map(game => game.id === editGame.id ? { id: editGame.id, ...updatedGame } : game);
      setGames(updatedGames);
      setEditGame(null);
      setFormData({ title: '', description: '', players: '', imageUrl: '', difficulty: '', category: '', age: '', time: '' });
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditGame(null);
    setFormData({ title: '', description: '', players: '', imageUrl: '', difficulty: '', category: '', age: '', time: '' });
  };

  // Added helper function to map category codes
  const getCategoryLabel = (code) => {
    switch(code) {
      case 'action': return 'Action';
      case 'strategy': return 'Strategy';
      case 'puzzle': return 'Puzzle';
      case 'adventure': return 'Adventure';
      case 'sports': return 'Sports';
      default: return code;
    }
  };

  return (
    <div className="games-page">
      {editGame && (
        <div className="update-form-container">
          <form onSubmit={handleUpdateSubmit}>
            {/* Added labels for clarity */}
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Game Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Game Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <label>Players:</label>
            <input
              type="number"
              name="players"
              placeholder="Number of Players"
              value={formData.players}
              onChange={handleInputChange}
              required
            />
            <label>Difficulty:</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <label>Game Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Game Category</option>
              <option value="action">Action</option>
              <option value="strategy">Strategy</option>
              <option value="puzzle">Puzzle</option>
              <option value="adventure">Adventure</option>
              <option value="sports">Sport</option>
            </select>
            <label>Recommended Age:</label>
            <input
              type="number"
              name="age"
              placeholder="Recommended Age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
            <label>Game Duration (e.g., 30min):</label>
            <input
              type="text"
              name="time"
              placeholder="Game Duration (e.g., 30min)"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
            <label>Image URL (optional):</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="Image URL (optional)"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
            <div className="form-buttons">
              <button type="submit" className="submit-btn">Update</button> {/* Update button moved to left */}
              <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="games-container">
        <div className="games-grid">
          {games.map(game => (
            <div 
              key={game.id} 
              className="game-card" 
              onClick={() => handleEdit(game)}  // Make the entire card clickable to view details
            >
              <img src={game.imageUrl} alt={game.title} className="game-image" />
              <p className="game-title"><strong>Title:</strong> {game.title}</p>
              <p className="game-category">
                <strong>Category:</strong> {getCategoryLabel(game.category)}
              </p>
              <p className="game-players">
                <strong>Players:</strong> {game.players}
              </p>
              <div className="game-actions">
                <button 
                  className="edit-btn" 
                  onClick={(e) => { e.stopPropagation(); handleEdit(game); }}
                >
                  Update
                </button>
                <button 
                  className="delete-btn" 
                  onClick={(e) => { e.stopPropagation(); handleDelete(game.id); }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
