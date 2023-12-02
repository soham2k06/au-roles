import mongoose, { Schema } from "mongoose";
module.exports =
  mongoose.models?.Roles ||
  mongoose.model(
    "Roles",
    new Schema({
      source: String,
      method: String,
      amount: Number,
      notes: String,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    })
  );
