const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { Pool } = require("pg");
const db = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DB_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(express.json());

app.get("/select", (req, res) => {
  db.query("SELECT * FROM users;", (err, result) => {
    if (err) {
      console.log(err);
    }
    const data = result.rows;
    console.log(data);
    res.json(data);
  });
});

app.post("/sign-in", (req, res) => {
  let success = false;
  db.query(
    `SELECT name, password FROM users WHERE name = '${req.body.username}' AND password = '${req.body.password}';`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      const data = result.rows;
      if (data.length > 0) success = true;
      res.json(success);
    }
  );
});

app.post("/register", (req, res) => {
  let registration = {
    success: false,
  };

  db.query(
    `INSERT INTO public.users(name, password, favorites) VALUES ('${req.body.username}', '${req.body.password}', '[]');`,
    (err, result) => {
      if (err) {
        if (err.code == 23505) {
          registration.message = "username already exists";
        }
      } else if (result) {
        registration.success = true;
        registration.message = "user created successfully";
      }
      res.json(registration);
    }
  );
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server has started");
});
