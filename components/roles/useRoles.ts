import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getRoles,
  createRole as createRoleApi,
  editRole as editRoleApi,
  deleteRole as deleteRoleApi,
  getRoleByName,
} from "@/utils/apiRoles";

import { useParams } from "next/navigation";
import { ObjectId } from "mongoose";
import { RoleProps } from "@/utils/types";

type RolePropForm = Omit<RoleProps, "_id">;

export function useRoles(query: object, selector: string) {
  const { data: roles, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles(query, selector),
  });

  return { roles, isLoading };
}

export function useRoleByName() {
  const { slug }: { slug: string } = useParams();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role"],
    queryFn: () => getRoleByName(slug),
  });

  return { role, isLoading };
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  const { mutate: createRole, isPending } = useMutation({
    mutationFn: createRoleApi,
    onSuccess: (data: RolePropForm) => {
      toast.success(`${data.name} is successfully created`);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createRole, isPending };
}

export function useEditRole() {
  const queryClient = useQueryClient();

  const { mutate: editRole, isPending } = useMutation({
    mutationFn: editRoleApi,
    onSuccess: (data: RoleProps) => {
      toast.success(`${data.name} is successfully updated`);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editRole, isPending };
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  const { mutate: deleteRole, isPending } = useMutation({
    mutationFn: (_id: ObjectId) => deleteRoleApi(_id),
    onSuccess: (data: RoleProps) => {
      toast.success(`${data.name} is successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteRole, isPending };
}
