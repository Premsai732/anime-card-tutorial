import express from "express";
import { animeData } from "./database.mjs";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.get("/api/anime", (req, res) => {
  try {
    res.json(
      animeData.map(({ id, title, image, rating }) => ({
        id,
        title,
        image,
        rating,
      }))
    );
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/anime/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const anime = animeData.find((a) => a.id === id);

  if (anime) {
    res.json(anime);
  } else {
    res.status(404).json({ error: "Anime not found" });
  }
});

app.listen(3000);
