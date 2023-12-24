// import { Schema, model } from "mongoose";
import { RoleProps } from "@/types";

// const RoleSchema = new Schema<RoleProps>({
//   name: { type: String, required: true },
//   team: { type: String, required: true },
//   ability: { type: String, required: true },
//   desc: { type: String, required: true },
//   tips: { type: [Array], required: false },
//   mod: Array,
//   isActive: { type: Boolean, required: true },
// });

// const Role = model("Role", RoleSchema);

// export default Role;

import { Schema, model, InferSchemaType } from "mongoose";

const Role = new Schema<RoleProps>(
  {
    name: { type: String, required: true },
    team: { type: String, required: true },
    ability: { type: String, required: true },
    desc: { type: String, required: true },
    mod: { type: String, required: true },
    tips: { type: [String], required: false },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);
type Role = InferSchemaType<typeof Role>;

export default model<Role>("Role", Role);
