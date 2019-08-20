require("dotenv").config();
const express = require("express");
const app = express();
const MOVIES = require("./movies");

//Middleware
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const validateToken = require("./middleware/validateHeader");

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(validateToken);

app.get("/movie", (req, res) => {
  const { genre, country, avg_vote } = req.query;
  let movieData = [...MOVIES];

  if (!genre && !country && !avg_vote) {
    return res.status(404).json({ error: "A search value must be provided" });
  }

  if (genre) {
    movieData = movieData.filter(movie =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }
  if (country) {
    movieData = movieData.filter(movie =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
  }
  if (avg_vote) {
    movieData = movieData.filter(
      movie => Number(movie.avg_vote) >= Number(parseFloat(avg_vote))
    );
  }
  res.json(movieData);
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
