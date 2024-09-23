const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src *;");
  next();
});

// Endpoint for all the Cleveland artworks that have an image
app.get("/cleveland-api/artworks", async (req, res) => {
  try {
    const response = await axios.get(
      "https://openaccess-api.clevelandart.org/api/artworks/?has_image=1"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

// Endpoint to handle query parameters for the Cleveland API
app.get("/cleveland-api/search", async (req, res) => {
  try {
    const query = req.query;
    const response = await axios.get(
      `https://openaccess-api.clevelandart.org/api/artworks/${query}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
