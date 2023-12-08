import mongoose, { Schema } from "mongoose";

module.exports =
  mongoose.models?.Admin ||
  mongoose.model(
    "Admin",
    new Schema({
      name: { name: String },
      password: { name: String },

      createdAt: {
        type: Date,
        default: Date.now(),
      },
    })
  );
