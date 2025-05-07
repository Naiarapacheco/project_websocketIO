import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import "./dbConnect.js";

const app = express();
const port = process.env.port || 3000;

const file = url.fileURLToPath(import.meta.url);
const dir = path.join(file, "../..", "public");
app.use(express.static(dir));

const serverHttp = http.createServer(app);

serverHttp.listen(port, () => 
    console.log(`Server listening on port ${port}`)
);

const io = new Server(serverHttp);

export default io;