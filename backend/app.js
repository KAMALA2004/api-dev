const express = require('express');
const connection = require('./db.js'); 
const app = express();
const PORT = 3000;
const cors=require('cors');
app.use(cors());
app.use(express.json()); 


app.get('/api/recipes', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const query = 'SELECT * FROM dish LIMIT ? OFFSET ?';
    connection.query(query, [limit, offset], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});

app.get('/api/recipes/search', (req, res) => {
    const {title,cuisine,calories,calories_op,total_time,total_time_op,rating,rating_op} = req.query;

    let query = 'SELECT * FROM dish WHERE 1';
    const values = [];

    if (title) {
        query += ' AND title LIKE ?';
        values.push(`%${title}%`);
    }

    if (cuisine) {
        query += ' AND cuisine = ?';
        values.push(cuisine);
    }

    if (calories && calories_op) {
        query += ` AND calories ${calories_op === '==' ? '=' : calories_op} ?`;
        values.push(Number(calories));
    }

    if (total_time && total_time_op) {
        query += ` AND total_time ${total_time_op === '==' ? '=' : total_time_op} ?`;
        values.push(Number(total_time));
    }

    if (rating && rating_op) {
        query += ` AND rating ${rating_op === '==' ? '=' : rating_op} ?`;
        values.push(Number(rating));
    }

    connection.query(query, values, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});


app.listen(PORT, () => {
    console.log(`API is running`);
});





