import express from "express";

const app = express();

app.set('view engine', 'ejs');

app.use("/", express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/about", (req, res) => {
  res.render("about");
})

app.get("/contact", (req, res) => {
  res.render("contact");
})

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
});
