import React, { useState } from 'react';
import '../create.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function CreateGame() {
  const db = getFirestore();
  
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGame = {
      ...formData,
      imageUrl: formData.imageUrl || 'https://placehold.co/600x400?text=No+Image'
    };
    try {
      const docRef = await addDoc(collection(db, 'games'), newGame);
      console.log("Document written with ID: ", docRef.id);
      setFormData({
        title: '',
        description: '',
        players: '',
        imageUrl: '',
        difficulty: '',
        category: '',
        age: '',
        time: ''
      });
    } catch (error) {
      console.error("Error saving game to Firebase:", error);
    }
  };

  return (
    <div className="create-game-page">
      <h1>Create New Game</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Game Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Game Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="players"
          placeholder="Number of Players"
          value={formData.players}
          onChange={handleInputChange}
          required
        />
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
        <input
          type="number"
          name="age"
          placeholder="Recommended Age"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="time"
          placeholder="Game Duration (e.g., 30min)"
          value={formData.time}
          onChange={handleInputChange}
          required
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={handleInputChange}
        />
        <div className="form-buttons">
          <button type="submit" className="submit-btn">Create</button>
        </div>
      </form>
    </div>
  );
}