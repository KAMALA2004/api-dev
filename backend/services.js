const connection = require('./db.js'); 
const jsonObject = require('./data.json');

const recipes = Object.values(jsonObject);

recipes.forEach(recipe => {
    const {
        cuisine,title, rating, prep_time,cook_time,total_time,description,nutrients,serves = '1'} = recipe;

    const query = `
        INSERT INTO dish (cuisine, title, rating, prep_time,cook_time, total_time, description,nutrients, serves)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const nutrientsJson = JSON.stringify(nutrients || {});

    connection.query(query,[cuisine, title, rating, prep_time, cook_time, total_time, description, nutrientsJson, serves],
        (err, results) => {
            if (err) {
                console.error(`Error inserting "${title}":`, err.message);
            } else {
                console.log(`Inserted: ${title}`);
            }
        }
    );
});
modules.exports=services;