const mongoose = require("mongodb");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps }
);

module.exports = mongoose.model("Category", CategorySchema);
