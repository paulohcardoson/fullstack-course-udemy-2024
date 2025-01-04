import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index")
});

app.post("/submit", (req, res) => {
  const { fName, lName } = req.body;

  res.render("index", { fName, lName })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
