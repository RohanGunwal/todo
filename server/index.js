const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes.js");
const todoRoutes = require("./routes/todoRoutes.js");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/todos", (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.JWT_SECRET,
    (err, decode) => {
      try {
        if (err) throw new Error("Invalid Request");
        next();
      } catch (err) {
        res.status(400).json({ JWTTokenError: err.message });
      }
    }
  );
});

app.use("/", userRoutes);
app.use("/todos", todoRoutes);

mongoose.set("strictQuery", false);

mongoose.connect(
  process.env.MONGO_URI,
  { useNewURLParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is up and running on http://localhost:${PORT}`);
    });
  }
);
