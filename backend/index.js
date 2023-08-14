import express from "express";
import cors from "cors";
import "./db/config.js";
import User from "./db/user.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  const result = await user.save();
  res.send(result);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
