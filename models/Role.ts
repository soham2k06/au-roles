import { RoleProps } from "@/utils/types";
import { Schema, model } from "mongoose";

const RoleSchema = new Schema<RoleProps>({
  name: { type: String, required: true },
  team: { type: String, required: true },
  ability: { type: String, required: true },
  desc: { type: String, required: true },
  tips: { type: [Array], required: false },
  mod: Array,
  isActive: { type: Boolean, required: true },
});

const Role = model("Role", RoleSchema);

export default Role;
