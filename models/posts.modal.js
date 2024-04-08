const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    filePath: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt" },
  }
);

const postModal = mongoose.model("posts", postSchema);

module.exports = postModal;
