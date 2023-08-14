const mongoose = require("mongodb");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps }
);

module.exports = mongoose.model("Post", PostSchema);
