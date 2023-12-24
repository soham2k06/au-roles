"use client";

import { RoleProps } from "@/types";
import {
  Category,
  CheckBox,
  CheckBoxOutlineBlank,
  Groups2,
  Tune,
} from "@mui/icons-material";
import {
  Autocomplete,
  AutocompleteInputChangeReason,
  Box,
  Checkbox,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { useState } from "react";
import { useEditRole, useRoles } from "./useRoles";
import { useSessionContext } from "@/contexts";
import { UseMutateFunction } from "@tanstack/react-query";

interface ToOmit extends RoleProps {
  isLoading: boolean;
}

interface AutocompleteProps {
  name: string;
  options: any[];
  disabled: boolean;
  defaultValue: string;
  value: string;
  freeSolo?: boolean;
  icon: React.ReactElement;
  _id: RoleProps["_id"];
  fieldToUpdate: keyof RoleProps;
  onChange: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  editRole: UseMutateFunction<
    any,
    Error,
    {
      _id: RoleProps["_id"];
      fieldToUpdate: keyof RoleProps;
      newValue: any;
    },
    unknown
  >;
}

type RoleInfosProps = Omit<ToOmit, "tips" | "desc" | "name">;

const CustomTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    &.MuiInputBase-root fieldset {
      border-color: #2f343b;
    }
    & .MuiInputBase-input {
      text-align: right;
    }
  }
`;

function AutoCompleteOwn({
  name,
  options,
  freeSolo = false,
  disabled,
  defaultValue,
  value,
  _id,
  icon,
  editRole,
  fieldToUpdate,
  onChange,
}: AutocompleteProps) {
  return (
    <Autocomplete
      id={name}
      fullWidth
      freeSolo={freeSolo}
      disableClearable
      forcePopupIcon={false}
      options={options.map((option) => option)}
      disabled={disabled}
      onSelect={() => {}}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <InputAdornment position="start">{icon}</InputAdornment>
              </>
            ),
          }}
        />
      )}
      defaultValue={defaultValue}
      onInputChange={onChange}
      onBlur={() => {
        if (defaultValue === value || (!freeSolo && !options.includes(value)))
          return;
        editRole({ _id, fieldToUpdate, newValue: value });
      }}
    />
  );
}

function RoleInfo({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        flex: 1,
      }}
    >
      {isLoading ? (
        <Skeleton
          variant="rounded"
          width="100%"
          height={58.88}
          animation="wave"
        />
      ) : (
        children
      )}
    </Box>
  );
}

function RoleInfos({
  isLoading,
  _id,
  team,
  ability,
  mod,
  isActive,
}: RoleInfosProps) {
  const { isAuthenticated } = useSessionContext();
  const { roles } = useRoles({}, ["ability"]) as { roles: RoleProps[] };
  const abilities = Array.from(new Set(roles?.map(({ ability }) => ability)));

  // Form Data
  const [teamF, setTeamF] = useState(team);
  const [abilityF, setAbilityF] = useState(ability);
  const [modF, setModF] = useState(mod);

  const { editRole, isPending } = useEditRole();

  const disabled = !isAuthenticated || isLoading || isPending;

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <RoleInfo isLoading={isLoading || isPending}>
          <AutoCompleteOwn
            name="role-team-edit"
            _id={_id}
            defaultValue={team}
            value={teamF}
            disabled={disabled}
            options={["crewmate", "neutral", "impostor", "add-on"]}
            icon={<Groups2 fontSize="small" sx={{ color: "#afb8c4" }} />}
            fieldToUpdate="team"
            onChange={(_, newValue) => setTeamF(newValue)}
            editRole={editRole}
          />
        </RoleInfo>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <RoleInfo isLoading={isLoading || isPending}>
          <AutoCompleteOwn
            name="role-ability-edit"
            _id={_id}
            freeSolo
            defaultValue={ability}
            value={abilityF}
            disabled={disabled}
            options={abilities}
            icon={<Category fontSize="small" sx={{ color: "#afb8c4" }} />}
            fieldToUpdate="ability"
            onChange={(_, newValue) => setAbilityF(newValue)}
            editRole={editRole}
          />
        </RoleInfo>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <RoleInfo isLoading={isLoading || isPending}>
          <AutoCompleteOwn
            name="role-mod-edit"
            _id={_id}
            value={modF}
            defaultValue={mod}
            disabled={disabled}
            options={["Town Of Host", "Town Of Host Enhanced"]}
            icon={<Tune fontSize="small" sx={{ color: "#afb8c4" }} />}
            fieldToUpdate="mod"
            onChange={(_, newValue) => setModF(newValue)}
            editRole={editRole}
          />
        </RoleInfo>
      </Grid>
      <Grid item xs={12} sm={6} md={2} lg={3}>
        <RoleInfo isLoading={isLoading || isPending}>
          <Box
            border={1}
            borderRadius={1}
            borderColor="#2f343b"
            bgcolor="transparent"
            display="flex"
            justifyContent="space-between"
            width="100%"
            p="10.5px"
            color="#afb8c4"
            sx={{ cursor: !disabled ? "pointer" : "default" }}
            component="button"
            onClick={() =>
              editRole({ _id, fieldToUpdate: "isActive", newValue: !isActive })
            }
            disabled={!isAuthenticated || isLoading || isPending}
          >
            <CheckBox />
            <Typography>{isActive ? "active" : "inactive"}</Typography>
          </Box>
        </RoleInfo>
      </Grid>
    </Grid>
  );
}

export default RoleInfos;
