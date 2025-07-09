import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const API_BASE = 'http://localhost:3000/api';

function RecipeApp() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    title: '',
    cuisine: '',
    calories: '',
    calories_op: '==',
    total_time: '',
    total_time_op: '==',
    rating: '',
    rating_op: '==',
  });

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/recipes`, {
        params: { page, limit },
      });
      setRecipes(res.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const searchRecipes = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = {};
      Object.entries(searchParams).forEach(([key, val]) => {
        if (val !== '') params[key] = val;
      });

      const res = await axios.get(`${API_BASE}/recipes/search`, { params });
      setRecipes(res.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Recipe List</h1>

      <form onSubmit={searchRecipes} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={searchParams.title}
          onChange={handleSearchChange}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          value={searchParams.cuisine}
          onChange={handleSearchChange}
          style={{ marginRight: 10 }}
        />

        <select name="calories_op" value={searchParams.calories_op} onChange={handleSearchChange}>
          <option value="==">=</option>
          <option value=">">{'>'}</option>
          <option value="<">{'<'}</option>
          <option value=">=">{'>='}</option>
          <option value="<=">{'<='}</option>
        </select>
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={searchParams.calories}
          onChange={handleSearchChange}
          style={{ width: 80, marginRight: 10 }}
        />

        <select name="total_time_op" value={searchParams.total_time_op} onChange={handleSearchChange}>
          <option value="==">=</option>
          <option value=">">{'>'}</option>
          <option value="<">{'<'}</option>
          <option value=">=">{'>='}</option>
          <option value="<=">{'<='}</option>
        </select>
        <input
          type="number"
          name="total_time"
          placeholder="Total Time"
          value={searchParams.total_time}
          onChange={handleSearchChange}
          style={{ width: 80, marginRight: 10 }}
        />

        <select name="rating_op" value={searchParams.rating_op} onChange={handleSearchChange}>
          <option value="==">=</option>
          <option value=">">{'>'}</option>
          <option value="<">{'<'}</option>
          <option value=">=">{'>='}</option>
          <option value="<=">{'<='}</option>
        </select>
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          step="0.1"
          value={searchParams.rating}
          onChange={handleSearchChange}
          style={{ width: 80, marginRight: 10 }}
        />

        <button type="submit">Search</button>
      </form>

     
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        <ul>
          {recipes.map((r) => (
            <li key={r.id} style={{ marginBottom: 10 }}>
              <strong>{r.title}</strong> - {r.cuisine} - Rating: {r.rating} - Calories: {r.calories} - Total Time: {r.total_time} mins
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: '0 10px' }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={recipes.length < limit}>
          Next
        </button>
      </div>
    </div>
  );
}

export default RecipeApp;
