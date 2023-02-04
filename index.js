import express from "express";
import path from "path";
import { __dirname } from "./src/utils/index.js";

// Route system
import mainRoutes from "./src/routes/main.js";

// App instance
const app = express();

app.use(express.static(path.resolve(__dirname(import.meta.url), "./src/public")));

// Using decoding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para la API

// Setting template engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(__dirname(import.meta.url), "./src/views")))

app.use("/", mainRoutes);

app.listen(3000, () => console.log("Listening on port 3000"));