import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import postsRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRoutes);

const PORT = process.env.PORT || 5000;

const URL_MONGO_DB = "mongodb://localhost:27017";

mongoose
  .connect(URL_MONGO_DB, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server run in port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
