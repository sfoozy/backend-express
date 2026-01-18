import "dotenv/config"; // MUST HAVE THIS AT THE TOP FOR PRISMA ORM TO WORK
import express from "express";
import root from "./routes/root.js";
import user from "./routes/user.js";
import image from "./routes/image.js";
import login from "./routes/login.js";

const app = express();

const port = 8000;

app.listen(port, () => {
  console.log(`==== Listening on port ${port} ====`)
});

app.use(express.json());
app.use("/", root);
app.use("/api/login", login);
app.use("/api/user", user);
app.use("/api/image", image);