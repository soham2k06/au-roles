import { Schema, model, InferSchemaType } from "mongoose";

import { AdminProps } from "@/types";

const AdminSchema = new Schema<AdminProps>(
  {
    name: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
  },
  { timestamps: true }
);
type Admin = InferSchemaType<typeof AdminSchema>;

export default model<Admin>("Admin", AdminSchema);
