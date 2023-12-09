import mongoose, { Schema } from "mongoose";
module.exports =
  mongoose.models?.Role ||
  mongoose.model(
    "Role",
    new Schema({
      name: String,
      team: String,
      ability: String,
      isActive: Boolean,
      desc: String,
      mod: Array,
      tips: Array,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    })
  );
