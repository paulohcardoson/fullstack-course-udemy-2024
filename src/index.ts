import express from "express";
import { v4 as uuidv4 } from "uuid";
import type { Post } from "../types/Post";

const app = express();

app.use(express.json())
app.set("view engine", "ejs");
app.set('views', './views');

app.use("/public", express.static("public"));

const posts: Post[] = [];

app.get("/", (req, res) => {
	res.render("index", { posts });
})

app.post("/posts/create", (req, res) => {
	const { title, content } = req.body;

	if (!title || !content) {
		res.status(400).json({ message: "Title and content are required" });
		return;
	}

	posts.push({ id: uuidv4(), title, content });
	res.redirect("/");
	return;
})

app.put("/posts/:id", (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	if (!id) {
		res.status(400).send("ID is required");
		return;
	}

	const postIndex = posts.findIndex((post) => post.id === id);

	if (postIndex === -1) {
		res.status(404).send("Post not found");
		return;
	}

	posts[postIndex] = { id, title, content };
	res.redirect("/");
	return;
})

app.delete("/posts/:id", (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).send("ID is required");
		return;
	}

	const postIndex = posts.findIndex((post) => post.id === id);

	if (postIndex === -1) {
		res.status(404).send("Post not found");
		return;
	}

	posts.splice(postIndex, 1);
	res.redirect("/");
	return;
})

app.listen(process.env.APP_PORT, () => {
	console.info(`Listening on port ${process.env.APP_PORT}`)
})