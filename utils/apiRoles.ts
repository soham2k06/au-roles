import { toast } from "sonner";
import { RoleProps } from "../types";
import { ObjectId } from "mongoose";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

type RolePropForm = Omit<RoleProps, "_id">;

export async function getRoles(query: object, selectors?: string[]) {
  const res = await fetch(BASE_API as string, {
    method: "POST",
    body: JSON.stringify({ query, selectors }),
  });

  if (!res.ok) {
    toast.error(res.statusText);
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export async function getRoleByName(roleName: string) {
  const res = await fetch(BASE_API + roleName);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export async function createRole(newData: RolePropForm) {
  const res = await fetch(BASE_API + "create-role", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });

  if (!res.ok) throw new Error("Network response was not ok");

  return res.json();
}

export async function editRole({
  _id,
  fieldToUpdate,
  newValue,
}: {
  _id: ObjectId;
  fieldToUpdate: keyof RoleProps;
  newValue: any;
}) {
  const res = await fetch(BASE_API as string, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id, fieldToUpdate, newValue }),
  });

  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function deleteRole(_id: ObjectId) {
  const res = await fetch(BASE_API as string, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id }),
  });

  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
