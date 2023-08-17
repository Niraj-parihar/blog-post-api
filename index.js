const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./middleware/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/catgories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(console.log("Connected to MongoDb"))
  .catch((err) => {
    console.log("connecting problem Error: ", err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

app.listen(3000, () => {
  console.log("Server is up and running");
});
