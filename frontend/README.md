# Tech Stack
Node.js, React.js,MySql

# Backend

# Database
MySQL
Node.js

# SQL Table
 create table dish(
  id INT AUTO_INCREMENT PRIMARY KEY,
    cuisine VARCHAR(100),
   title VARCHAR(100),
   rating FLOAT,
     prep_time INT,
     cook_time INT,
    total_time INT,
     description TEXT,
    nutrients JSON,
    serves VARCHAR(100));

#
1.JSON datta is parsed.
2.Stored in MySql database
3.Two Api Endpoints are connected
    a.Get all recipes
       url:http://localhost:3000/api/recipes?page=1&limit=10
    b.Search recipes
       url:http://localhost:3000/api/recipes/search?title=Briam&description=Greek%20Mixed%20Vegetables%20in%20Tomato%20Sauce

# Frontend
React.js

1.npm i
2.npm start