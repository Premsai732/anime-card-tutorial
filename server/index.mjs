import express from "express";
import { animeData, users } from "./database.mjs";
import cors from "cors";
import lodash from "lodash";
import { loginValidate, signupValidate } from "./validate.mjs";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    
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
app.post('/api/signup',signupValidate,(req, res) => {
  const data= req.body
  const user = users.find(value => value.email === data.email);
  if(user){
    res.status(400).json({error:'User already exists'});
  }
  else{
    res.json(lodash.pick(data,['name','email']));
    users.push(data);
  }
});
app.post('/api/login',loginValidate,(req, res) => {
  const data= req.body
  const user = users.find(value => value.email === data.email);
  if(!user){
    res.status(400).json({message:'No user found'});
  }
  if(!(user.password === data.password)){
    res.status(400).json({message:'Invalid username or password'});
  }
    res.status(200).json(lodash.pick(user,['name','email']));  
}
);
app.listen(3000);
