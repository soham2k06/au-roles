"use client";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AUButton } from ".";
import { useState } from "react";
interface Props {
  children: React.ReactNode;
  disabled: boolean;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}
function ConfirmDialog({ children, disabled, onConfirm }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  return (
    <>
      <AUButton onClick={handleOpenModal}>Delete role</AUButton>
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
          {children}
        </DialogContent>

        <DialogActions sx={{ py: 0, px: 3 }}>
          <AUButton onClick={handleCloseModal} disabled={disabled}>
            Cancel
          </AUButton>
          <AUButton sx={{ color: "" }} disabled={disabled} onClick={onConfirm}>
            {disabled ? (
              <Box display="inline-flex" alignItems="center" gap={1}>
                <CircularProgress size="0.7rem" color="inherit" /> Deleting...
              </Box>
            ) : (
              "Confirm"
            )}
          </AUButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmDialog;
