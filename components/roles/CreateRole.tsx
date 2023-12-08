"use client";

import { useState } from "react";
import { AUButton } from "..";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Add, Close, Remove } from "@mui/icons-material";
import { RoleErrors, RoleProps } from "@/utils/types";
import { useCreateRole, useRoles } from "./useRoles";

type Ommited = Omit<RoleProps, "_id" | "tips">;
interface NewRoleProps extends Ommited {
  tip: string;
}

function CreateRole() {
  // Form Dialog
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <>
      <AUButton sx={{ width: "fit-content" }} onClick={handleOpenModal}>
        Create roles
      </AUButton>
      {open && <Form open={open} handleCloseModal={handleCloseModal} />}
    </>
  );
}

function Form({
  open,
  handleCloseModal,
}: {
  open: boolean;
  handleCloseModal: () => void;
}) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const { roles } = useRoles({}, "ability") as { roles: RoleProps[] };
  const abilities = Array.from(new Set(roles?.map(({ ability }) => ability)));

  const { createRole, isPending } = useCreateRole();

  // Formdata
  const initialData: NewRoleProps = {
    name: "",
    team: "",
    ability: "",
    mod: [],
    desc: "",
    tip: "",
    isActive: false,
  };

  const [formdata, setFormdata] = useState<NewRoleProps>(initialData);

  const [formError, setFormError] = useState<RoleErrors>({
    name: false,
    ability: false,
    desc: false,
    mod: false,
    team: false,
  });
  const { ability, desc, isActive, mod, name, team, tip } = formdata;

  // Tips
  const [tips, setTips] = useState<string[]>([]);

  const handleAddTip = () => {
    if (tip.trim() !== "") {
      setTips((prev) => [...prev, tip]);
      setFormdata({ ...formdata, tip: "" });
    }
  };

  const handleRemovetip = (i: number) =>
    setTips((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTip();
  };

  function handleChange({
    name,
    value,
  }: {
    name: string;
    value: string | boolean | string[];
  }) {
    setFormdata({ ...formdata, [name]: value });
  }

  const validateForm = () => {
    const error: RoleErrors = {
      name: false,
      ability: false,
      desc: false,
      mod: false,
      team: false,
    };

    if (!name.trim()) error.name = true;
    if (!team) error.team = true;
    if (!ability) error.ability = true;
    if (!mod || !mod.length) error.mod = true;
    if (!desc) error.desc = true;

    setFormError(error);
    const hasError = Object.values(error).some((err) => err);
    return !hasError;
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateForm()) return;

    const tipsToConsider = !!tips.length ? tips : !!tip ? [tip] : [] || [];

    createRole(
      { ...formdata, tips: tipsToConsider },
      { onSuccess: handleCloseModal }
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="create-dialog-title"
      aria-describedby="create-dialog-description"
      sx={{ backdropFilter: "blur(1px)" }}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { bgcolor: "#101418" } }}
    >
      <DialogTitle variant="h5" sx={{ p: { xs: 1, sm: 3 } }}>
        Create new role
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseModal}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "gray",
        }}
      >
        <Close fontSize="small" />
      </IconButton>

      <DialogContent sx={{ p: { xs: 1, sm: 3 } }}>
        {/* FORM STARTS HERE */}
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <Box display="flex" gap={{ xs: 1, sm: 2 }}>
              <TextField
                id="role-name"
                name="role-name"
                label="Name*"
                variant="filled"
                fullWidth
                size={isSmallScreen ? "small" : "medium"}
                InputLabelProps={{
                  sx: { fontSize: { xs: "20px", sm: "24px" } },
                }}
                error={formError.name}
                value={name}
                onChange={(e) =>
                  handleChange({
                    name: "name",
                    value: e.target.value.replace(" ", "-"),
                  })
                }
              />

              <Autocomplete
                id="role-team"
                fullWidth
                popupIcon=""
                size={isSmallScreen ? "small" : "medium"}
                options={["crewmate", "neutral", "impostor", "add-on"].map(
                  (option) => option
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Team*"
                    error={formError.team}
                    InputLabelProps={{
                      sx: { fontSize: { xs: "20px", sm: "24px" } },
                    }}
                    variant="filled"
                  />
                )}
                inputValue={team}
                onInputChange={(_, value) =>
                  handleChange({ name: "team", value })
                }
              />
            </Box>

            {/* Ability - mod */}
            <Box
              display="flex"
              gap={{ xs: 1, sm: 2 }}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              {/* ability */}
              <Autocomplete
                id="role-ability"
                freeSolo
                fullWidth
                size={isSmallScreen ? "small" : "medium"}
                options={abilities.map((option) => option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      sx: { fontSize: { xs: "20px", sm: "24px" } },
                    }}
                    error={formError.ability}
                    label="Ability*"
                    variant="filled"
                  />
                )}
                inputValue={ability}
                onInputChange={(_, value) =>
                  handleChange({ name: "ability", value })
                }
              />

              {/* mod */}
              <Autocomplete
                multiple
                fullWidth
                id="mod-name"
                size={isSmallScreen ? "small" : "medium"}
                options={["Town Of Host", "Town Of Host Enhanced"].map(
                  (opt) => opt
                )}
                popupIcon=""
                value={mod}
                onChange={(_, value) => handleChange({ name: "mod", value })}
                filterSelectedOptions
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  );
                }}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                    />
                  ));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    error={formError.mod}
                    InputLabelProps={{
                      sx: { fontSize: { xs: "20px", sm: "24px" } },
                    }}
                    label="Mod*"
                  />
                )}
              />
            </Box>

            {/* description */}
            <TextField
              id="role-desc"
              name="role-desc"
              label="Description*"
              variant="filled"
              multiline
              maxRows={3}
              error={formError.desc}
              size={isSmallScreen ? "small" : "medium"}
              InputLabelProps={{
                sx: { fontSize: { xs: "20px", sm: "24px" } },
              }}
              value={desc}
              onChange={(e) =>
                handleChange({ name: "desc", value: e.target.value })
              }
            />
            {/* tips */}
            <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
              <TextField
                label="Tips"
                variant="filled"
                sx={{ flexGrow: 1 }}
                size={isSmallScreen ? "small" : "medium"}
                InputLabelProps={{
                  sx: { fontSize: { xs: "20px", sm: "24px" } },
                }}
                value={tip}
                onChange={(e) =>
                  handleChange({ name: "tip", value: e.target.value })
                }
                onKeyDown={handleEnterKeyPress}
              />
              <IconButton
                disabled={!formdata.tip}
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
            {!!tips.length && (
              <Box
                component="ul"
                display="flex"
                flexDirection="column"
                gap={2}
                maxHeight={100}
                overflow="scroll"
                bgcolor="#101418cc"
                border={1}
                borderColor="#64686a"
                borderRadius={1}
                p={1}
              >
                {tips.map((sentance, i) => (
                  <Box
                    key={i}
                    component="li"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
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
            {/* isActive */}
            <FormControl>
              <FormControlLabel
                control={<Checkbox id="role-active" name="role-active" />}
                label={`Role is ${isActive ? "active" : "inactive"}`}
                sx={{ userSelect: "none", width: "fit-content" }}
                value={isActive}
                onChange={(_, value) =>
                  handleChange({ name: "isActive", value })
                }
              />
            </FormControl>
          </Box>
          <AUButton
            type="submit"
            sx={{ width: "100%", mt: 2 }}
            autoFocus
            disabled={isPending}
          >
            {isPending ? (
              <Box display="inline-flex" alignItems="center" gap={1}>
                <CircularProgress size="0.7rem" color="inherit" /> Creating...
              </Box>
            ) : (
              "Create"
            )}
          </AUButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRole;
