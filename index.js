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
  db.query("SELECT * FROM test;", (err, result) => {
    if (err) {
      console.log(err);
    }
    const data = result.rows;
    console.log(data);
    res.json(data);
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server has started");
});
