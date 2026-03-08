const express = require("express");
const mongoose = require("mongoose");
const petRoutes = require("./routes/petRoutes");const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Pet Care API Running");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});