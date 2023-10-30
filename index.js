const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_PORT,
  REDIS_URL,
  SESSION_SECRET,
} = require("./config.js");
const postRouter = require("./routes/post.routes.js");
const userRouter = require("./routes/user.routes.js");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Successfully connected to DB"))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(express.json());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.get("/", (req, res, next) => {
  res.send("<h2>Hi There !!!</h2><p>Rakoto & Rasoa potato</p>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
