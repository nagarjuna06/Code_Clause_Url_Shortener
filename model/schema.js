const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
    },
    alias: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
linkSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 86400 });

const linkModel = mongoose.model("links", linkSchema);

module.exports = linkModel;
