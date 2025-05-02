import express from "express";
import url from "url";
import path from "path";

const app = express();
const port = process.env.port || 3000;

const file = url.fileURLToPath(import.meta.url);
const dir = path.join(file, "../..", "public");

app.use(express.static(dir));

app.listen(port, () => console.log(`Server listening on port ${port}`));
