const express = require("express");
const cors = require("cors");
const app = express();

const { Pool } = require("pg");

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 4000, () => {
  console.log("Server has started");
});
