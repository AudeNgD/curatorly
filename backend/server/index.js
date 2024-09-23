const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/cleveland-api/artworks", async (req, res) => {
  try {
    const response = await axios.get(
      "https://openaccess-api.clevelandart.org/api/artworks/"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
