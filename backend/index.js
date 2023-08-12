import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("App is working.");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
