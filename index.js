const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
const config = require("./config.js");
const cors = require("cors");

const postRouter = require("./routes/post.routes.js");
const userRouter = require("./routes/user.routes.js");

const app = express();

const mongoURL = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/?authSource=admin`;

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

let redisClient = redis.createClient({
  host: config.REDIS_URL,
  port: config.REDIS_PORT,
});

app.enable("trus proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60,
    },
  })
);

app.use(express.json());

app.get("/api/v1", (req, res, next) => {
  res.send("<h2>Hi There !!!</h2><p>Rakoto & Rasoa potato</p>!!");
  console.log("yeah it ran");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
