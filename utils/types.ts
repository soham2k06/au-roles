import { ObjectId } from "mongoose";

export interface RoleProps {
  _id: ObjectId;
  name: string;
  isActive: boolean;
  team: string;
  desc: string;
  tips: string[];
  mod: string[];
  ability: string;
}

export interface RoleErrors {
  name: boolean;
  ability: boolean;
  desc: boolean;
  mod: boolean;
  team: boolean;
}

export interface AdminProps {
  name: string;
  password: string;
}
