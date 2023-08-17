const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./middleware/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/catgories");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(console.log("Connected to MongoDb"))
  .catch((err) => {
    console.log("connecting problem Error: ", err);
  });

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

app.listen(3000, () => {
  console.log("Server is up and running");
});
