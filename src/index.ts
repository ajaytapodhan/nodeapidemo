require("dotenv").config({ path: __dirname + "/.env" });
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
//const cors = require("cors");
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();
const PORT: number = 3006;
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("error", (err: Error) => console.log(err));

app.use("/", router());
