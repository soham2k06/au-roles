import { Edit, Save } from "@mui/icons-material";
import { IconButton, Skeleton, TextField } from "@mui/material";
import { useEditRole } from "./useRoles";
import { useState } from "react";
import { RoleProps } from "@/types";
import { useRouter } from "next/navigation";
import { replaceDash } from "@/utils";
interface Props {
  _id: RoleProps["_id"];
  name: RoleProps["name"];
  isLoading: boolean;
  isAuthenticated: boolean;
}
function RoleName({ _id, name, isLoading, isAuthenticated }: Props) {
  const navigation = useRouter();
  const { editRole, isPending: isUpdating } = useEditRole();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [nameF, setNameF] = useState<RoleProps["name"]>(name);
  const handleChangeName = () => {
    setIsEditing(false);
    if (name !== nameF) {
      editRole({ _id, fieldToUpdate: "name", newValue: nameF });
      navigation.replace(nameF);
    }
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleChangeName();
  };

  return (
    <>
      {!isEditing ? (
        isLoading ? (
          <Skeleton variant="rounded" width={160} animation="wave" />
        ) : (
          replaceDash(name)
        )
      ) : (
        <TextField
          defaultValue={name}
          onChange={(e) =>
            setNameF(e.target.value.toLowerCase().replace(" ", "-"))
          }
          onKeyDown={handleEnterKeyPress}
        />
      )}
      {isAuthenticated && (
        <IconButton
          size="large"
          sx={{
            ml: 2,
            bgcolor: "#151920cc",
            border: 1,
            borderColor: "#2f343b",
            borderRadius: 2,
            backdropFilter: "blur(0.5px)",
          }}
          disabled={isUpdating}
          onClick={() => {
            if (!isEditing) setIsEditing(true);
            else handleChangeName();
          }}
          disableRipple
        >
          {!isEditing ? <Edit fontSize="small" /> : <Save fontSize="small" />}
        </IconButton>
      )}
    </>
  );
}

export default RoleName;
