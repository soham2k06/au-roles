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
import { RoleProps } from "@/types";

type RolePropForm = Omit<RoleProps, "_id">;

export function useRoles(query: object, selectors?: string[]) {
  const {
    data: roles,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles(query, selectors),
  });

  return { roles, isLoading, isFetching, refetch };
}

export function useRoleByName() {
  const { slug }: { slug: string } = useParams();

  const {
    data: role,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["role", slug],
    queryFn: () => getRoleByName(slug),
  });

  return { role, isLoading, isFetching };
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
    mutationFn: ({
      _id,
      fieldToUpdate,
      newValue,
    }: {
      _id: ObjectId;
      fieldToUpdate: keyof RoleProps;
      newValue: any;
    }) => editRoleApi({ _id, fieldToUpdate, newValue }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["role"] }),
    onError: (err) => toast.error(err.message),
  });

  return { editRole, isPending };
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteRole,
    isPending,
    data,
  } = useMutation({
    mutationFn: (_id: ObjectId) => deleteRoleApi(_id),
    onSuccess: () => {
      toast.success(`Role is successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteRole, isPending };
}
