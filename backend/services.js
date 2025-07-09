const connection = require('./db.js');
const jsonObject = require('./data.json');

const recipes = Object.values(jsonObject).map(recipe => {
    const {
    cuisine = '',
    title = '',
    rating = 0,
    prep_time = 0,
    cook_time = 0,
    total_time = 0,
    description = '',
    nutrients = {},
    serves = '1'
} = recipe;


    const nutrientsJson = JSON.stringify(nutrients || {});

    return [cuisine, title, rating, prep_time, cook_time, total_time, description, nutrientsJson, serves];
});

recipes.forEach(dataArray => {
    const query = `
        INSERT INTO dish (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, dataArray, (err, results) => {
        if (err) {
            console.error(`Error inserting "${dataArray[1]}":`, err.message);
        } else {
            console.log(`Inserted: ${dataArray[1]}`);
        }
    });
});
module.exports=recipes;