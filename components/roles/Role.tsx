"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Skeleton,
  Stack,
  capitalize,
} from "@mui/material";

import {
  Category,
  CheckBox,
  Circle,
  Comment,
  Groups2,
  Star,
  TipsAndUpdates,
  Tune,
} from "@mui/icons-material";

import {
  AUButton,
  ContainerBox,
  RoleDetails,
  RoleInfo,
  Section,
} from "@/components";

import { useDeleteRole, useRoleByName } from "./useRoles";
import { replaceDash } from "@/utils";
import { RoleProps } from "@/types";

function Role({ role }: { role: string }) {
  const { status } = useSession();
  const navigation = useRouter();
  const goBack = () => navigation.back();
  const { deleteRole, isPending } = useDeleteRole();

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const {
    role: curRole,
    isFetching: isLoading,
  }: {
    role: RoleProps;
    isFetching: boolean;
  } = useRoleByName();
  const { _id, name, isActive, team, desc, tips, ability, mod } = curRole || {};

  useEffect(() => {
    document.title = capitalize(role);
  }, []);

  return (
    <Section>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Section.Title gutterBottom={false}>
          {isLoading ? (
            <Skeleton variant="rounded" width={160} animation="wave" />
          ) : (
            replaceDash(name)
          )}
        </Section.Title>

        <AUButton onClick={goBack}>back</AUButton>
      </Box>
      <Divider sx={{ my: 3, display: { xs: "none", md: "inline" } }} />
      <ContainerBox>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <RoleInfo icon={<Groups2 fontSize="small" />} isLoading={isLoading}>
              {team}
            </RoleInfo>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <RoleInfo
              icon={<Category fontSize="small" />}
              isLoading={isLoading}
            >
              {ability}
            </RoleInfo>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <RoleInfo icon={<Tune fontSize="small" />} isLoading={isLoading}>
              {mod?.length === 2 ? "both" : mod}
            </RoleInfo>
          </Grid>
          <Grid item xs={12} sm={6} md={2} lg={3}>
            <RoleInfo
              icon={<CheckBox fontSize="small" />}
              isLoading={isLoading}
            >
              {isActive ? "Active" : "Inactive"}
            </RoleInfo>
          </Grid>
        </Grid>
        <Divider sx={{ my: { xs: 1, md: 2 } }} flexItem>
          <Star fontSize="small" />
        </Divider>
        <Stack spacing={2}>
          <RoleDetails>
            <RoleDetails.Title>
              <Comment fontSize="small" /> Description
            </RoleDetails.Title>
            <RoleDetails.Body isLoading={isLoading}>{desc}</RoleDetails.Body>
          </RoleDetails>
          {!!tips?.length && (
            <RoleDetails>
              <RoleDetails.Title>
                <TipsAndUpdates fontSize="small" /> Tips
              </RoleDetails.Title>
              <RoleDetails.Body>
                {curRole.tips.map((tip: string, i: number) => (
                  <Box
                    key={i}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    mb={1}
                    sx={{ ":last-child": { mb: 0 } }}
                  >
                    <Circle sx={{ fontSize: "10px" }} /> {tip}
                  </Box>
                ))}
              </RoleDetails.Body>
            </RoleDetails>
          )}
        </Stack>

        {status === "authenticated" && !isLoading && (
          <Stack spacing={2} direction="row" mt={2}>
            {/* <AUButton>Edit role</AUButton> */}
            <AUButton onClick={handleOpenModal}>Delete role</AUButton>
          </Stack>
        )}
      </ContainerBox>

      {status === "authenticated" && (
        <Dialog
          open={open}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
          sx={{ backdropFilter: "blur(1px)" }}
          fullWidth
          PaperProps={{ sx: { py: 2 } }}
        >
          <DialogTitle sx={{ py: 0 }} variant="h5" gutterBottom>
            Are you sure?
          </DialogTitle>
          <DialogContent
            sx={{
              py: 0,
              pb: 2,
              mb: 2,
              borderBottom: 1,
              borderColor: "#565656",
            }}
          >
            Confirm that you are deleting the role '{role}'.
          </DialogContent>

          <DialogActions sx={{ py: 0, px: 3 }}>
            <AUButton onClick={handleCloseModal}>Cancel</AUButton>
            <AUButton
              sx={{ color: "" }}
              disabled={isPending}
              onClick={() => deleteRole(_id, { onSuccess: goBack })}
            >
              {isPending ? (
                <Box display="inline-flex" alignItems="center" gap={1}>
                  <CircularProgress size="0.7rem" color="inherit" /> Deleting...
                </Box>
              ) : (
                "Confirm"
              )}
            </AUButton>
          </DialogActions>
        </Dialog>
      )}
    </Section>
  );
}

export default Role;
