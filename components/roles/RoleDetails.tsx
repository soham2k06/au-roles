"use client";

import { RoleProps } from "@/types";
import {
  Add,
  Circle,
  Close,
  Comment,
  Edit,
  Remove,
  TipsAndUpdates,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEditRole } from "./useRoles";
import { useState } from "react";
import { useSessionContext } from "@/contexts";
import { AUButton } from "..";

interface Props {
  _id: RoleProps["_id"];
  tips: RoleProps["tips"];
  desc: RoleProps["desc"];
  isLoading: boolean;
  isEditingTips: boolean;
  setIsEditingTips: React.Dispatch<React.SetStateAction<boolean>>;
}

function RoleDetail({ children }: { children: React.ReactNode }) {
  return (
    <Box
      pb={2}
      sx={{ border: 1, borderRadius: 1, p: 1, borderColor: "#2f343b" }}
    >
      {children}
    </Box>
  );
}

function RoleDetails({
  tips,
  isLoading,
  desc,
  _id,
  isEditingTips,
  setIsEditingTips,
}: Props) {
  const { isAuthenticated } = useSessionContext();
  const { editRole, isPending: isUpdating } = useEditRole();
  const [isEditingDesc, setIsEditingDesc] = useState<boolean>(false);
  const [descF, setDescF] = useState<RoleProps["desc"]>();

  const [tipsF, setTipsF] = useState<RoleProps["tips"]>(tips);

  // Tips
  const [tip, setTip] = useState<string>("");

  const handleAddTip = () => {
    if (tip.trim() !== "") {
      setTipsF((prev) => [...prev, tip]);
      setTip("");
    }
  };

  const handleRemovetip = (i: number) =>
    setTipsF((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);

  function handleChangeDesc() {
    setIsEditingDesc(false);
    if (descF === desc) return;
    editRole({ _id, fieldToUpdate: "desc", newValue: descF });
  }
  function handleChangeTips() {
    setIsEditingTips(false);
    if (tipsF === tips) return;
    editRole({ _id, fieldToUpdate: "tips", newValue: tipsF });
  }

  const handleEnterKeyPressDesc = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") handleChangeDesc();
  };
  const handleEnterKeyPressTips = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") handleChangeTips();
  };

  return (
    <Stack spacing={2}>
      <RoleDetail>
        <RoleDetail.Title>
          <Comment fontSize="small" /> Description{" "}
          {isAuthenticated && (
            <IconButton
              size="small"
              sx={{
                ml: 1,
                bgcolor: "#151920cc",
                border: 1,
                borderColor: "#2f343b",
                borderRadius: 2,
                backdropFilter: "blur(0.5px)",
              }}
              disabled={isUpdating}
              onClick={() => setIsEditingDesc(true)}
            >
              <Edit fontSize="small" />
            </IconButton>
          )}
        </RoleDetail.Title>
        <RoleDetail.Body isLoading={isLoading}>{desc}</RoleDetail.Body>
      </RoleDetail>
      {!!tips?.length && (
        <RoleDetail>
          <RoleDetail.Title>
            <TipsAndUpdates fontSize="small" /> Tips{" "}
            {isAuthenticated && (
              <IconButton
                size="small"
                sx={{
                  ml: 1,
                  bgcolor: "#151920cc",
                  border: 1,
                  borderColor: "#2f343b",
                  borderRadius: 2,
                  backdropFilter: "blur(0.5px)",
                }}
                disabled={isUpdating}
                onClick={() => setIsEditingTips(true)}
              >
                <Edit fontSize="small" />
              </IconButton>
            )}
          </RoleDetail.Title>
          <RoleDetail.Body>
            {tips.map((tip: string, i: number) => (
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
          </RoleDetail.Body>
        </RoleDetail>
      )}

      {/* Dialogs */}
      <EditDialog
        onEdit={handleChangeDesc}
        isEditing={isEditingDesc}
        onClose={() => setIsEditingDesc(false)}
      >
        <TextField
          id="role-desc-edit"
          name="role-desc-edit"
          label="Description"
          defaultValue={desc}
          onChange={(e) => setDescF(e.target.value)}
          multiline
          maxRows={4}
          fullWidth
          onKeyDown={handleEnterKeyPressDesc}
        />
      </EditDialog>
      <EditDialog
        onEdit={handleChangeTips}
        isEditing={isEditingTips}
        onClose={() => setIsEditingTips(false)}
      >
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }} mb={3}>
          <TextField
            label="Tips"
            variant="filled"
            sx={{ flexGrow: 1 }}
            InputLabelProps={{
              sx: { fontSize: { xs: "20px", sm: "24px" } },
            }}
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            onKeyDown={handleEnterKeyPressTips}
          />
          <IconButton
            disabled={!tip}
            sx={{
              border: 1,
              borderColor: "#64686a",
              borderRadius: 1,
              width: { xs: 52, sm: 60 },
              height: { xs: 52, sm: 60 },
            }}
            onClick={handleAddTip}
          >
            <Add />
          </IconButton>
        </Box>
        {/* tips - display */}
        {!!tipsF.length && (
          <Box
            component="ul"
            display="flex"
            flexDirection="column"
            maxHeight={240}
            overflow="scroll"
            bgcolor="#101418cc"
            border={1}
            borderColor="#64686a"
            borderRadius={1}
            p={1}
          >
            {tipsF.map((sentance, i) => (
              <Box
                key={i}
                component="li"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderBottom={1}
                sx={{
                  pb: 1,
                  pt: 1,
                  ":first-child": {
                    pt: 0,
                  },
                  ":last-child": {
                    pb: 0,
                    borderBottom: 0,
                  },
                }}
              >
                <Typography>{sentance}</Typography>
                <IconButton
                  size="small"
                  sx={{
                    border: 1,
                    borderColor: "#64686a",
                    borderRadius: 2,
                    width: 32,
                    height: 32,
                  }}
                  onClick={() => handleRemovetip(i)}
                >
                  <Remove fontSize="small" sx={{ fontSize: "16px" }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </EditDialog>
    </Stack>
  );
}

function EditDialog({
  isEditing,
  onClose,
  onEdit,
  children,
}: {
  children: React.ReactNode;
  isEditing: boolean;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <>
      {isEditing && (
        <Dialog open={isEditing} onClose={onClose} maxWidth="sm" fullWidth>
          <DialogTitle>Enter description for the role</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "gray",
            }}
          >
            <Close fontSize="small" />
          </IconButton>
          <DialogContent>
            {children}
            <Stack direction="row" justifyContent="end" gap={2} mt={2}>
              <AUButton onClick={onClose}>Cancel</AUButton>
              <AUButton sx={{ color: "" }} onClick={onEdit}>
                Confirm
              </AUButton>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h6"
      display="flex"
      gap={1}
      alignItems="center"
      borderBottom={1}
      width="fit-content"
      borderColor="#2f343b"
      pb={0.5}
      mb={1}
      sx={{ userSelect: "none" }}
      fontSize={{ xs: 24, md: 28 }}
    >
      {children}
    </Typography>
  );
}

function Body({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <Box fontFamily="sans-serif" fontSize="18px">
      {isLoading ? (
        <Skeleton variant="rounded" width="100%" height={28} animation="wave" />
      ) : (
        children
      )}
    </Box>
  );
}

RoleDetail.Title = Title;
RoleDetail.Body = Body;

export default RoleDetails;
