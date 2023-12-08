import { Schema, model } from "mongoose";
import { AdminProps } from "@/utils/types";

const AdminSchema = new Schema<AdminProps>({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const Admin = model("Admin", AdminSchema);

export default Admin;
