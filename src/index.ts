import express from "express";
import ejs from "ejs";

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", "src/views");

app.get("/", (req, res) => {
  res.render("index", { env: { date: new Date() } });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ${process.env.PORT}`)
);
