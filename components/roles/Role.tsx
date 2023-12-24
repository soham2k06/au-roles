"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  capitalize,
} from "@mui/material";

import {
  Cancel,
  Category,
  CheckBox,
  Circle,
  Comment,
  Edit,
  Groups2,
  Save,
  Star,
  TipsAndUpdates,
  Tune,
} from "@mui/icons-material";

import {
  AUButton,
  ContainerBox,
  FullPageLoader,
  RoleDetails,
  RoleInfos,
  Section,
} from "@/components";

import { useDeleteRole, useRoleByName } from "./useRoles";

import { RoleProps } from "@/types";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useSessionContext } from "@/contexts";
import RoleName from "./RoleName";

function Role({ role }: { role: string }) {
  const { isAuthenticated } = useSessionContext();

  const navigation = useRouter();
  const goBack = () => navigation.back();
  const { deleteRole, isPending } = useDeleteRole();

  const {
    role: curRole,
    isFetching: isLoading,
  }: {
    role: RoleProps;
    isFetching: boolean;
  } = useRoleByName();
  const { _id, name, isActive, team, desc, tips, ability, mod } = curRole || {};

  const [isEditingTips, setIsEditingTips] = useState<boolean>(false);

  useEffect(() => {
    document.title = capitalize(role);
  }, []);

  if (isLoading || !curRole) return <FullPageLoader />;

  return (
    <Section>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Section.Title gutterBottom={false}>
          <RoleName
            _id={_id}
            name={name}
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
          />
        </Section.Title>

        <AUButton onClick={goBack}>back</AUButton>
      </Box>
      <Divider sx={{ my: 3, display: { xs: "none", md: "inline" } }} />
      <ContainerBox>
        <RoleInfos
          _id={_id}
          isLoading={isLoading}
          ability={ability}
          isActive={isActive}
          mod={mod}
          team={team}
        />
        <Divider sx={{ my: { xs: 1, md: 2 } }} flexItem>
          <Star fontSize="small" />
        </Divider>
        <RoleDetails
          isEditingTips={isEditingTips}
          setIsEditingTips={setIsEditingTips}
          _id={_id}
          desc={desc}
          isLoading={isLoading}
          tips={tips}
        />
        {isAuthenticated && !isLoading && (
          <Stack spacing={2} direction="row" mt={2}>
            {isAuthenticated && (
              <ConfirmDialog
                disabled={isPending}
                onConfirm={() => deleteRole(_id, { onSuccess: goBack })}
              >
                Confirm that you are deleting the role '{role}'.
              </ConfirmDialog>
            )}
            {isAuthenticated && !tips.length && (
              <AUButton onClick={() => setIsEditingTips(true)}>
                Add Tips
              </AUButton>
            )}
          </Stack>
        )}
      </ContainerBox>
    </Section>
  );
}

export default Role;
