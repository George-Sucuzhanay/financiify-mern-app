const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes/transactions");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/api", routes);

const PORT = process.env.PORT || 3001;

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
