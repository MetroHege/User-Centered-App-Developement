import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routers/user-routers.mjs";
import mediaRouter from "./routers/media-routers.mjs";
import logger from "./middlewares/middlewares.mjs";
import authRouter from "./routers/auth-router.mjs";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.join(__dirname, "../docs")));
// serve uploaded media files url: /media({file})
app.use("/media", express.static(path.join(__dirname, "../uploads")));

const teamSetting = "dark";

// simple custom middleware logging/debugging all requests
app.use(logger);

app.get("/", (req, res) => {
  const values = {
    title: "REST API media",
    message: "Media items gonna be here",
  };
  res.render("home", values);
});

// auth endpoints
app.use("/api/auth", authRouter);

// media endpoints
app.use("/api/media", mediaRouter);

// user endpoints
app.use("/api/user", userRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
